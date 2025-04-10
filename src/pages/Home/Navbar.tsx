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
    <div>
      <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isMobileMenuOpen && (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
                {/* Icon when menu is open */}
                {isMobileMenuOpen && (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    onClick={closeMobileMenu}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center pr-12">
                <img
                  className="h-8 w-auto "
                  src="https://i.postimg.cc/tCLPxXkG/Bk-logo-removebg-preview.png"
                  alt="Your Company"
                />
                <h4
                  className="rounded-md py-2 text-xl font-medium
                 text-blue-500 hover:bg-gray-700 hover:text-white"
                >
                  BookShop
                </h4>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex pl-32 space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-white' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="allbooks"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-blue-500' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    All Books
                  </NavLink>
                  <NavLink
                    to="about"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-blue-500' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="recomendeds"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-blue-500' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    Recomendeds
                  </NavLink>
                  <NavLink
                    to="blogs"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-blue-500' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    Blogs
                  </NavLink>
                  <NavLink
                    to="dashboard"
                    className={({ isActive }) =>
                      `rounded-md px-3 pt-3 text-sm font-medium ${
                        isActive ? 'text-blue-500' : 'text-gray-300'
                      } hover:bg-gray-700 hover:text-white`
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-10 sm:pr-0">
              <div className="rounded-md pr-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                {!isAuthenticated ? (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `rounded-md ${isActive ? 'text-blue-500' : 'text-gray-300'} hover:bg-gray-700 hover:text-white`
                    }
                  >
                    Login
                  </NavLink>
                ) : (
                  <div>
                    <Logout />
                  </div>
                )}
              </div>
              <p className="pr-8 ">
                <ModeToggle />
              </p>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="allbooks"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                All Books
              </NavLink>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <NavLink
                to="recomendeds"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                Recomendeds
              </NavLink>
              <NavLink
                to="blogs"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                Blogs
              </NavLink>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'text-blue-500' : 'text-white'
                  } bg-gray-900`
                }
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
