# 📚 Book-Shop-Frontend-Site - Modern E-Commerce Bookstore Platform

## 🚀 Live Demo

🔗 [https://book-shop-app-five.vercel.app](https://book-shop-app-five.vercel.app)

## Admin Credentials: admin@gmail.com | 111111

## 🌟 Key Features

### 🔐 Advanced Authentication

- 🛡️ JWT-based secure authentication
- 👨‍💻 Role-based access control (Admin/User)
- 🔄 Password reset functionality
- 🚦 Protected routes with `ProtectedRoute` component

### 📦 Comprehensive Product Management

- 🔍 Advanced search (title, author, category)
- 🏷️ Multi-filter system (price, availability)
- 📊 Real-time stock management
- 🖼️ Product gallery with multiple images

### 🛒 Robust Order System

- 🛍️ Shopping cart functionality
- 💳 SurjoPay payment gateway integration
- 📦 Order tracking history
- 📧 Automated order confirmation

### 📊 Powerful Admin Dashboard

- 👥 User management (CRUD operations)
- 📚 Full product lifecycle management
- 💰 Sales analytics dashboard
- 📦 Order fulfillment system

## 🛠️ Technology Stack

### Frontend

| Technology                                                                                                             | Usage            | Version |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                    | Core Framework   | 19.0.0  |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)      | Type Safety      | ~5.7.2  |
| ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)                     | State Management | 4.2.0   |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Styling          | 4.0.12  |

### Backend

| Technology                                                                                                  | Usage     | Version |
| ----------------------------------------------------------------------------------------------------------- | --------- | ------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  | Runtime   | 18+     |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Framework | 4.x     |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)    | Database  | 8.13.1  |

## 🖥️ Project Structure

book-shop/
├── src/
│ ├── components/ # Reusable components (ProtectedRoute, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Route components
│ │ ├── Home/ # Home page components
│ │ ├── Dashboard/ # Admin/user dashboard
│ │ ├── Product/ # Product management
│ │ └── Order/ # Order processing
│ ├── store/ # Redux store configuration
│ ├── types/ # TypeScript interfaces
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main application
│ └── main.tsx # Entry point
├── public/ # Static assets
├── .env.example # Environment template
└── package.json # Project configuration



## 🚀 Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone Both Repositories
```bash
git clone https://github.com/Hasan-Mahadi/Book-Shop-Frontend-Site.git
git clone https://github.com/Hasan-Mahadi/Book-Shop-Baeckend-Site.git

cd Book-Shop-Baeckend-Site

# Install dependencies
npm install

# Create environment file
echo "NODE_ENV=development
PORT=5000
BCRYPT_SALT_ROUNDS=6
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here" > 

# Start development server
npm run dev

🔧 Available Scripts
Script Description
npm run dev Starts development server
npm run build Creates production build
npm run lint Runs ESLint for code quality
npm run format Formats code with Prettier
npm run preview Previews production build

🌐 API Endpoints
Endpoint Method Description
/api/auth/register POST User registration
/api/auth/login POST User login
/api/products GET Get all products
/api/orders POST Create new order

📊 Database Schema
mermaid
Copy
erDiagram
USER ||--o{ ORDER : places
USER {
string \_id PK
string name
string email
string password
string role
date createdAt
}
PRODUCT ||--o{ ORDER_ITEM : includes
PRODUCT {
string \_id PK
string title
string author
string category
number price
number stock
}
ORDER ||--o{ ORDER_ITEM : contains
ORDER {
string \_id PK
string user FK
string status
number total
}

📧 Contact
Project Lead: [Hasan Mahadi]
Email: hasanmahadihm99@gmail.com
GitHub: Hasan-Mahadi
