import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface WhereClause {
  category?: {
    slug: string;
  };
  featured?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: WhereClause = {};
    if (category) {
      where.category = { slug: category };
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, images, categoryId, stock, featured } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        images: images || [],
        categoryId,
        stock: stock || 0,
        featured: featured || false,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
