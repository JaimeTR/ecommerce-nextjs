'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  images,
  slug,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image: images[0] || '/placeholder.png',
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${slug}`}>
        <div className="aspect-square w-full overflow-hidden bg-gray-200">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}
