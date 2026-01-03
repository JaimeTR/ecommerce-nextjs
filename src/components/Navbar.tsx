'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              E-Shop
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Categories
            </Link>
          </div>

          <div className="flex items-center">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
