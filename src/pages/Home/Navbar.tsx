/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="mr-2 flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              {/* <img
                className="h-8 w-auto"
                src="https://i.postimg.cc/tCLPxXkG/Bk-logo-removebg-preview.png"
                alt="BookShop Logo"
              /> */}
              <span className="ml-2 text-xl font-bold text-green-600 dark:text-green-400">
                BookShop
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex space-x-4 lg:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="allbooks"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                All Books
              </NavLink>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="recomendeds"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                Recommended
              </NavLink>
              <NavLink
                to="blogs"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                Blogs
              </NavLink>
            </div>
          </div>

          {/* Right Side - Auth & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700'
                  }`
                }
              >
                <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  Login
                </button>
              </NavLink>
            ) : (
              <div className="hidden md:block ml-2">
                <Logout />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="allbooks"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              All Books
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
            <NavLink
              to="recomendeds"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              Recommended
            </NavLink>
            <NavLink
              to="blogs"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              Blogs
            </NavLink>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={closeMobileMenu}
            >
              Dashboard
            </NavLink>
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-3">
                <ModeToggle />
                {!isAuthenticated ? (
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                ) : (
                  <Logout />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
