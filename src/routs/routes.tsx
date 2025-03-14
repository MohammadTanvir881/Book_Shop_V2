import App from '@/App';
import AdminLayout from '@/components/layout/AdminLayout';
import About from '@/pages/About';
import AdminDashboard from '@/pages/AdminDashboard';
import AllBooks from '@/pages/All-Books';
import Blogs from '@/pages/Blogs';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login';
import Recomended from '@/pages/Recomended';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'contact',
        element: <Contact></Contact>,
      },
      {
        path: 'about',
        element: <About></About>,
      },
      {
        path: 'allbooks',
        element: <AllBooks></AllBooks>,
      },
      {
        path: 'recomendeds',
        element: <Recomended></Recomended>,
      },
      {
        path: 'blogs',
        element: <Blogs></Blogs>,
      },
    ],
  },

  //---------------------admin path
  {
    path: '/admin',
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },

  //------------------------ user path

  {
    path: '/user',
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },

  //------------Before SignUp

  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: 'profile',
    element: <UserProfile></UserProfile>,
  },
]);

export default router;
