/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Logout from '@/pages/Logout';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen p-5 fixed top-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:translate-x-0 z-50 overflow-y-auto`}
    >
      <button
        className="md:hidden text-white text-2xl absolute top-4 right-4"
        onClick={toggleSidebar}
      >
        <AiOutlineClose />
      </button>
      <h2 className="text-xl font-bold mt-1 mb-6 text-center">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium ${
                isActive ? 'text-blue-500' : 'text-gray-300'
              } hover:bg-gray-700 hover:text-white`
            }
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium ${
                isActive ? 'text-blue-500' : 'text-gray-300'
              } hover:bg-gray-700 hover:text-white`
            }
          >
            My Profile
          </NavLink>
        </li>

        {/* RBAC Routes */}
        {user?.role === 'admin' && (
          <li>
            <NavLink
              to="/dashboard/user"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-500' : 'text-gray-300'
                } hover:bg-gray-700 hover:text-white`
              }
            >
              User Management
            </NavLink>
          </li>
        )}

        {user?.role === 'admin' && (
          <li>
            <NavLink
              to="/dashboard/productManage"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-500' : 'text-gray-300'
                } hover:bg-gray-700 hover:text-white`
              }
            >
              Products Management
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/dashboard/allbooks"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium ${
                isActive ? 'text-blue-500' : 'text-gray-300'
              } hover:bg-gray-700 hover:text-white`
            }
          >
            All Products
          </NavLink>
        </li>

        {(user?.role === 'admin' || user?.role === 'user') && (
          <li>
            <NavLink
              to="/dashboard/orderList"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-500' : 'text-gray-300'
                } hover:bg-gray-700 hover:text-white`
              }
            >
              Order Management
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium ${
                isActive ? 'text-blue-500' : 'text-gray-300'
              } hover:bg-gray-700 hover:text-white`
            }
          >
            Back To Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 fixed top-0 right-0 left-0 md:left-64 z-40">
      <button className="md:hidden text-2xl" onClick={toggleSidebar}>
        <AiOutlineMenu />
      </button>
      <h1 className="text-lg font-bold">
        Welcome {user?.role === 'admin' ? 'Admin' : 'User'}
      </h1>
      <div className="hidden md:flex items-center space-x-2">
        <img
          className="h-8 w-auto"
          src="/src/assets/images/Bk-logo-removebg-preview.png"
          alt="Logo"
        />
        <h4 className="text-xl font-medium text-blue-500">BookShop</h4>
      </div>
      <div className="flex items-center space-x-4">
        <span>{user?.name}</span>
        <Logout />
      </div>
    </div>
  );
};

const RoleBasedDashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === 'user') return <Navigate to="/user/dashboard" replace />;
  return <Navigate to="/login" />;
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 bg-gray-100 min-h-screen pt-16 md:pt-0 md:ml-64">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className="p-4 mt-16 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
