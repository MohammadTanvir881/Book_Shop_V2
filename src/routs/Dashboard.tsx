/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Logout from '@/pages/Logout';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaBorderAll } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaUsersRectangle } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsBorderWidth } from 'react-icons/bs';
import { IoMdHome } from 'react-icons/io';
import { GrOverview } from 'react-icons/gr';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`bg-gray-100 text-black w-64 h-screen p-5 fixed top-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0 z-50 overflow-y-auto shadow-xl`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">
          <span className="text-green-500">Book</span>Shop
        </h2>
        <button
          className="md:hidden text-white text-xl hover:text-blue-400 transition-colors"
          onClick={toggleSidebar}
        >
          <AiOutlineClose />
        </button>
      </div>
      
      <div className="mb-6 px-3 py-2 bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-300">Welcome back,</p>
        <p className="font-medium text-white">{user?.name}</p>
        <p className="text-xs text-blue-400 uppercase">{user?.role}</p>
      </div>

      <ul className="space-y-1">
        <li>
          <NavLink
            to="/dashboard"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <GrOverview className="text-lg" />
            <span>Overview</span>
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/dashboard/profile"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <CgProfile className="text-lg" />
            <span>My Profile</span>
          </NavLink>
        </li>

        {/* RBAC Routes */}
        {user?.role === 'admin' && (
          <li>
            <NavLink
              to="/dashboard/user"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <FaUsersRectangle className="text-lg" />
              <span>User Management</span>
            </NavLink>
          </li>
        )}

        {user?.role === 'user' && (
          <li>
            <NavLink
              to="/dashboard/my-orders"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <FaBorderAll className="text-lg" />
              <span>My Orders</span>
            </NavLink>
          </li>
        )}

        {user?.role === 'admin' && (
          <li>
            <NavLink
              to="/dashboard/productManage"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <AiOutlineProduct className="text-lg" />
              <span>Products Management</span>
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/dashboard/allbooks"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <MdOutlineShoppingCart className="text-lg" />
            <span>All Products</span>
          </NavLink>
        </li>

        {(user?.role === 'admin' || user?.role === '') && (
          <li>
            <NavLink
              to="/dashboard/orderList"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <BsBorderWidth className="text-lg" />
              <span>Order Management</span>
            </NavLink>
          </li>
        )}

        <li className="mt-6 pt-4 border-t border-gray-700">
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <IoMdHome className="text-lg" />
            <span>Back To Home</span>
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
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0 md:left-64 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button 
            className="md:hidden text-gray-600 hover:text-blue-600 mr-4 text-xl"
            onClick={toggleSidebar}
          >
            <AiOutlineMenu />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Dashboard <span className="text-green-600">{user?.role === 'admin' ? 'Admin' : 'User'} Panel</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-600">{user?.name}</span>
            <span className="text-xs text-blue-600 uppercase">{user?.role}</span>
          </div>
          <Logout />
        </div>
      </div>
    </header>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 min-h-screen pt-16 md:ml-64 md:pt-0">
        <TopNavbar toggleSidebar={toggleSidebar} />
        
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;