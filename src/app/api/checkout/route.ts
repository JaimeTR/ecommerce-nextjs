import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress }: { items: CartItem[]; shippingAddress: ShippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
