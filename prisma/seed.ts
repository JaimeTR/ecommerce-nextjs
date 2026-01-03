import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
    },
  });

  const books = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: 'Books',
      slug: 'books',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    },
  });

  console.log('Categories created');

  // Create products
  await prisma.product.upsert({
    where: { slug: 'wireless-headphones' },
    update: {},
    create: {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      ],
      categoryId: electronics.id,
      stock: 50,
      featured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'smart-watch' },
    update: {},
    create: {
      name: 'Smart Watch',
      slug: 'smart-watch',
      description: 'Fitness tracker and smartwatch with heart rate monitor',
      price: 299.99,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      ],
      categoryId: electronics.id,
      stock: 30,
      featured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'laptop-backpack' },
    update: {},
    create: {
      name: 'Laptop Backpack',
      slug: 'laptop-backpack',
      description: 'Durable laptop backpack with multiple compartments',
      price: 79.99,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      ],
      categoryId: electronics.id,
      stock: 100,
      featured: false,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'cotton-t-shirt' },
    update: {},
    create: {
      name: 'Cotton T-Shirt',
      slug: 'cotton-t-shirt',
      description: 'Comfortable 100% cotton t-shirt in various colors',
      price: 29.99,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      ],
      categoryId: clothing.id,
      stock: 200,
      featured: false,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'denim-jeans' },
    update: {},
    create: {
      name: 'Denim Jeans',
      slug: 'denim-jeans',
      description: 'Classic denim jeans with modern fit',
      price: 89.99,
      images: [
        'https://images.unsplash.com/photo-1542272454315-7f6b2f4c7c8e?w=400',
      ],
      categoryId: clothing.id,
      stock: 75,
      featured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'programming-guide' },
    update: {},
    create: {
      name: 'Complete Programming Guide',
      slug: 'programming-guide',
      description: 'Comprehensive guide to modern programming',
      price: 49.99,
      images: [
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      ],
      categoryId: books.id,
      stock: 150,
      featured: false,
    },
  });

  console.log('Products created');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
