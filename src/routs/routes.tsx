import App from '@/App';

import ProtectedRoute from '../components/layout/ProtectedRoute';
import About from '@/pages/About';
import AllBooks from '@/pages/All-Books';
import Blogs from '@/pages/Blogs';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login';
import Recomended from '@/pages/Recomended';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import OverviewDashboard from './OverviewDashboard';
import AllUser from '@/pages/UserManagment/AllUser';
import ProductMange from '@/pages/ProductManagment/ProductMange';
import OrderManagment from '@/pages/OrderManagment/OrderManagment';
import CreateProduct from '@/pages/ProductManagment/CreateProduct';
import EditProductPage from '@/pages/ProductManagment/EditProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'allbooks', element: <AllBooks /> },
      { path: 'recomendeds', element: <Recomended /> },
      { path: 'blogs', element: <Blogs /> },
    ],
  },

  //--------------------- Before SignUp Routes ---------------------
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/profile', element: <UserProfile /> },

  //---------------------- Admin Routes -------------------

  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <OverviewDashboard /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'allbooks', element: <AllBooks /> },
      {
        path: 'user',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AllUser />
          </ProtectedRoute>
        ),
      },
      {
        path: 'productManage',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ProductMange />
          </ProtectedRoute>
        ),
      },

      {
        path: 'orderManage',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <OrderManagment />
          </ProtectedRoute>
        ),
      },

      {
        path: 'products/create',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },

      {
        path: 'products/edit/:id',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <EditProductPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
