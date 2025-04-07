<<<<<<< HEAD

# Book-Shop-Frontend-Site

# Next Level Projects using Node.js Express.js Mongoose TypeScript Redux React JWT Shadcn Antd and Tailwind-CSS

# React + TypeScript + Vite

=======

# Book-Shop-Frontend-Site

📘 BookShope-4
A modern, full-stack Book Shop application built with a clean UI, secure authentication system, dynamic product management, and integrated payment system using ShurjoPay.

🔗 Live Site
👉 Visit the Live App
(🔁 Replace with actual URL)

🚀 Features
🔐 Authentication & Authorization
User registration & login with JWT

Role-based access: user, admin

Password hashing with secure logout functionality

🏠 Public Pages
Home page with featured books & banners

About and Contact pages

Blogs & Testimonials section

View All Books page with:

Search by title, author, or category

Filter by category, price, author, availability

📘 Product Features
Product Details page with image, description, and Buy Now button

Admin product management:

Create, Edit, Delete products

Product detail viewing

🛒 Checkout & Payment
Integrated ShurjoPay payment gateway

Order form with product, user, and pricing details

Order confirmation, payment success page

📦 Order Management
Admin: View all orders, edit order details

User: View own orders in dashboard

Order editing and detailed view

📊 Admin Dashboard
Manage Users (View, Deactivate)

Manage Products (CRUD)

Manage Orders (CRUD)

👤 User Dashboard
View order history

Update profile

Change password securely

🧑‍💻 Technologies Used
Frontend:

React 19, React Router 7

Redux Toolkit

Tailwind CSS, ShadCN UI, MUI, Ant Design, Hero Icons

Framer Motion, AOS animation

React Hook Form + Zod for form handling and validation

Axios for API communication

Backend:

Node.js (assumed), Express.js (if applicable)

MongoDB & Mongoose

JWT for auth

ShurjoPay for payment integration

Others:

ESLint, Prettier, TypeScript, Vite

Toast notifications (react-toastify, react-hot-toast)

Loading spinners, error handling with sweetalert2

⚙️ Installation & Usage
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/bookshope-4.git
cd bookshope-4

# Install dependencies
npm install

# Run the development server
npm run dev

# Format code
npm run format

# Lint the code
npm run lint
🧪 Test Admin Credentials
txt
Copy
Edit
Email: admin@example.com
Password: Admin@123


📁 Folder Structure Highlights
bash
Copy
Edit
src/
├── pages/
│   ├── Home/
│   ├── ProductManagment/
│   ├── OrderManagment/
│   ├── UserManagment/
├── components/
│   └── layout/
├── router/
│   └── index.tsx
└── App.tsx


📝 Project Objectives
Build a responsive and user-friendly book shop

Ensure secured role-based access

Enable dynamic product and order management

Integrate SurjoPay for real-world payment simulation

Provide a rich UI/UX experience