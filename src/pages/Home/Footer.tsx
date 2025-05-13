import {
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaGithub,
} from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <h4 className="text-2xl font-bold text-green-500">BookShop</h4>
            </div>
            <p className="text-center md:text-left text-sm leading-relaxed">
              Discover your next favorite read from our extensive collection of
              books. We offer the best prices and fastest delivery for book
              lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 pb-2 w-full text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center md:text-left w-full">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-green-400 transition-colors duration-300 block"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="hover:text-green-400 transition-colors duration-300 block"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className="hover:text-green-400 transition-colors duration-300 block"
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-green-400 transition-colors duration-300 block"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 pb-2 w-full text-center md:text-left">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="text-green-500 mr-2" />
                <Link
                  to="mailto:tanvirrashid881@gmail.com"
                  className="hover:text-green-400 transition-colors duration-300 text-sm"
                >
                  tanvirrashid881@gmail.com
                </Link>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="text-green-500 mr-2" />
                <Link
                  to="tel:01766627499"
                  className="hover:text-green-400 transition-colors duration-300 text-sm"
                >
                  01569146826
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 pb-2 w-full text-center md:text-left">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com/mohammad.tanvir.114"
                target="_blank"
                className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </Link>
              <Link
                to="https://github.com/MohammadTanvir881"
                target="_blank"
                className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Github"
              >
                <FaGithub size={18} />
              </Link>
              <Link
                to="https://www.linkedin.com/in/tanvirrashid881/"
                target="_blank"
                className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </Link>
              {/* <Link
                to="#"
                className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </Link> */}
            </div>
            <div className="mt-4 w-full">
              <p className="text-sm text-center md:text-left">
                Subscribe to our newsletter for updates
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BookShop. All rights reserved. |
            Designed & Developed by Tanvir Rashid
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
