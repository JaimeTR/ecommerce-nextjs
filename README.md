# E-Commerce Next.js Application

A complete, production-ready e-commerce application built with **Next.js 14**, **TypeScript**, **Prisma**, **PostgreSQL**, **Stripe**, and **Cloudinary**.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 💳 Stripe payment integration
- 🖼️ Image management with Cloudinary support
- 📱 Responsive design with Tailwind CSS
- 🔍 Product search and filtering
- ⚡ Server-side rendering and API routes
- 🎨 Modern UI with Lucide icons
- 🔔 Toast notifications

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe
- **Image Upload**: Cloudinary (ready to integrate)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payment processing)
- Cloudinary account (for image uploads)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JaimeTR/ecommerce-nextjs.git
cd ecommerce-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

5. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

6. (Optional) Seed the database with sample data:
```bash
npx prisma db seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm start
```

## Database Management

### Update Schema
After modifying `prisma/schema.prisma`:
```bash
npx prisma generate
npx prisma db push
```

### View Database
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma migrate reset
```

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── products/      # Products endpoints
│   │   │   ├── categories/    # Categories endpoints
│   │   │   └── checkout/      # Stripe checkout
│   │   ├── cart/              # Shopping cart page
│   │   ├── products/          # Products listing page
│   │   ├── success/           # Order success page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── Navbar.tsx
│   │   └── ProductCard.tsx
│   ├── lib/                   # Utilities
│   │   ├── prisma.ts          # Prisma client
│   │   └── stripe.ts          # Stripe client
│   └── store/                 # State management
│       └── cart.ts            # Cart store (Zustand)
├── .env.example               # Environment variables template
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

## Adding Sample Data

To add products and categories via the API:

```bash
# Add a category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics", "image": "https://example.com/image.jpg"}'

# Add a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "images": ["https://example.com/laptop.jpg"],
    "categoryId": "your-category-id",
    "stock": 10,
    "featured": true
  }'
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Ensure PostgreSQL database is accessible
- Set all environment variables
- Run `npm run build && npm start`

## Environment Variables

See `.env.example` for all required environment variables.

### Getting Stripe Keys
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. For webhooks, use the Stripe CLI or dashboard to get the webhook secret

### Getting Cloudinary Credentials
1. Create a Cloudinary account at https://cloudinary.com
2. Find your credentials in the dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please open an issue on the GitHub repository.
