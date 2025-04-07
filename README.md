<<<<<<< HEAD

# Book-Shop-Frontend-Site

# Next Level Projects using Node.js Express.js Mongoose TypeScript Redux React JWT Shadcn Antd and Tailwind-CSS

# React + TypeScript + Vite

=======

# Book-Shop-Frontend-Site

Bookshop E-Commerce Application

Project Overview!

This is a full-stack e-commerce application for a bookshop with user authentication, product management, and order processing functionalities. The application features role-based access control (admin/user), secure payment integration, and responsive design.

Features
Core Functionalities
User Authentication

Secure registration and login with JWT

Role-based access control (admin/user)

Password hashing for security

Protected routes based on user roles

Product Management

Browse books with search and filtering

Product details pages

Admin CRUD operations for products

Stock management

Order Processing

Checkout system

Order placement with quantity validation

Payment integration (SurjoPay)

Order history and details

Dashboard

Admin dashboard for user/product/order management

User dashboard for order history and profile management

UI/UX Features
Responsive design for all screen sizes

Loading states and error handling

Toast notifications for user feedback

Interactive product browsing

Technologies Used
Frontend
React v19

React Router v7

Redux Toolkit for state management

TailwindCSS with plugins for styling

Framer Motion for animations

Various UI component libraries (Ant Design, Material UI, shadcn/ui)

Backend
Node.js with Express (implied by JWT and Mongoose usage)

MongoDB with Mongoose ODM

JWT for authentication

Development Tools
Vite for build tooling

TypeScript

ESLint and Prettier for code quality

Setup Instructions
Prerequisites
Node.js (v18 or higher recommended)

MongoDB Atlas account or local MongoDB installation

Git

Installation
Clone the repository:

bash
Copy
git clone [repository-url]
cd bookshope-4
Install dependencies:

bash
Copy
npm install
Set up environment variables:
Create a .env file in the root directory with the following variables:

Copy
VITE_API_BASE_URL=your_backend_api_url
VITE_JWT_SECRET=your_jwt_secret_key
VITE_PAYMENT_GATEWAY_KEY=your_surjopay_key
Start the development server:

bash
Copy
npm run dev
Backend Setup
Note: The backend implementation is not included in this frontend code. You'll need to set up a separate backend service with the following endpoints:

Authentication: /api/auth/register, /api/auth/login

Products: /api/products, /api/products/:id

Orders: /api/orders, /api/orders/:id

Users: /api/users, /api/users/:id

Project Structure
Copy
src/
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
├── pages/                 # Route components
│   ├── Home/              # Home page components
│   ├── About.tsx          # About page
│   ├── All-Books.tsx      # Product listing page
│   ├── Blogs.tsx          # Blog page
│   ├── Login.tsx          # Login page
│   ├── Register.tsx       # Registration page
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   └── ...                # Other components
├── routes/                # Routing configuration
├── store/                 # Redux store configuration
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
Available Scripts
npm run dev: Start development server

npm run build: Build for production

npm run lint: Run ESLint

npm run format: Format code with Prettier

npm run preview: Preview production build

Deployment
The application can be deployed to platforms like Vercel, Netlify, or any static hosting service. For full functionality, you'll need to deploy the backend separately to a service like Render, Railway, or AWS.

Future Enhancements
Product review system

Wishlist functionality

Advanced analytics dashboard

Email notifications

Social media integration

Support
For any issues or questions, please contact the development team at [support-email].
