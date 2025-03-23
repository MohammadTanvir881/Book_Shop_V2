import App from '@/App';
// import AdminLayout from '@/components/layout/AdminLayout';
// import UserLayout from '@/components/layout/UserLayout';
// import AdminDashboard from '@/pages/AdminDashboard';
// import UserDashboard from '@/pages/UserDashboard';
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

// import AdminSettings from '@/pages/Home/AdminSettings';
// import ManageUsers from '@/pages/Home/ManageUsers';
// import UserOrders from '@/pages/Home/UserOrders';
import Dashboard from './Dashboard';
import OverviewDashboard from './OverviewDashboard';
import AllUser from '@/pages/UserManagment/AllUser';

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
      { path: 'profile', element: <UserProfile></UserProfile> },
      { path: 'user', element: <AllUser></AllUser> },
    ],
  },

  {
    path: '/user/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: 'overview', element: <OverviewDashboard /> },
      { path: 'profile', element: <UserProfile></UserProfile> },
    ],
  },
]);

export default router;
