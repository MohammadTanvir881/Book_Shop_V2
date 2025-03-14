import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start text-center md:text-left gap-4">
        {/* Logo and About */}
        <div className="w-full md:w-1/3">
          <div className="flex shrink-0 items-center pl-25  lg:pl-40">
            <img
              className="h-8  "
              src="/src/assets/images/Bk-logo-removebg-preview.png"
              alt="Your Company"
            />
            <h4
              className="rounded-md  py-2 text-xl font-medium
   text-blue-500 hover:bg-gray-700 hover:text-white"
            >
              BookShop
            </h4>
          </div>

          <p className=" pl-4 text-xl lg:pl-42 mt-1">
            {' '}
            Grab Your Favorite Book !
          </p>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/3">
          <h3 className="font-semibold text-md mt-2 mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="blogs" className="hover:underline">
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="contact" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div className="w-full md:w-1/3">
          <h3 className="font-semibold text-md mt-2 mb-4">Connect with us</h3>
          <div className="flex justify-center md:justify-start space-x-5">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram size={18} />
            </a>
          </div>
          <p className="mt-3 text-xs">Email: hasanmahadihm99@gmail.com</p>
          <p className="text-xs mt-3">Phone: 01766-627499</p>
        </div>
      </div>

      <div className="mt-4 text-center text-xs border-t border-gray-700 pt-2">
        &copy; {new Date().getFullYear()} Hasan Mahadi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
