'use client';

import { useEffect } from 'react';
import { useCart } from '@/store/cart';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped soon.
        </p>
        <div className="space-y-4">
          <p className="text-gray-700">
            You will receive an email confirmation with order details.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/products"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
