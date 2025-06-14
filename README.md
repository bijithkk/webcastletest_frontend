# Product Management Dashboard

![Project Screenshot](/screenshot.png) <!-- Add a screenshot if available -->

A modern product management dashboard built with Next.js, TypeScript, and Tailwind CSS, featuring CRUD operations, filtering, and pagination.

## Features

- 📋 **Product Listing** with pagination
- 🔍 **Advanced Filtering** by categories and search
- ➕ **Add New Products** with image upload
- ✏️ **Edit Existing Products**
- 🗑️ **Delete Products** with confirmation dialog
- 📱 **Responsive Design** for all screen sizes
- ⚡ **Optimized Performance** with client-side caching

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- API server running (update API base URL in context)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-management-dashboard.git
   cd product-management-dashboard

Install dependencies: 
npm install
# or
yarn install

Set up environment variables: cp .env.example .env.local 

Run the development server: npm run dev
# or
yarn dev 

Open http://localhost:3000 in your browser. 

Project Structure :- 

/product-management-dashboard
├── app/
│   ├── products/               # Product routes
│   │   ├── [id]/               # Dynamic product detail pages
│   │   ├── create/             # Product creation page
│   │   └── page.tsx            # Product listing page
├── components/
│   ├── buttons/                # Reusable button components
│   ├── ProductDetail/          # Product detail components
│   ├── ProductFilters/         # Filter components
│   ├── ProductItem/            # Product card component
│   └── ui/                     # UI primitives
├── context/                    # Global state management
├── hooks/                      # Custom hooks
├── public/                     # Static assets
└── types/                      # TypeScript type definitions

Available Scripts :- 
dev: Runs the development server

build: Creates an optimized production build

start: Starts the production server

lint: Runs ESLint

format: Formats code with Prettier

API InteAPI Integration ;- 

GET    /api/v1/product/get              - List all products
GET    /api/v1/product/get/:id          - Get single product
POST   /api/v1/product/add              - Create new product
PATCH  /api/v1/product/update/:id       - Update product
DELETE /api/v1/product/delete/:id       - Delete product
GET    /api/v1/product/categories       - Get all categories

