import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo and About */}
        <div>
          <h2 className="text-xl font-bold">YourBrand</h2>
          <p className="text-sm mt-2">Building the future, one step at a time.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><NavLink   to="/"  className="hover:underline">Home</NavLink></li>
           <li><NavLink   to="about"  className="hover:underline">About</NavLink></li>
            <li><NavLink   to="blogs"  className="hover:underline">Blogs</NavLink></li>
           <li><NavLink   to="contact"  className="hover:underline">Contact</NavLink></li>
          </ul>
          
        </div>
        

        {/* Social Media & Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Connect with us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-blue-400"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-blue-300"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram size={20} /></a>
          </div>
          <p className="mt-4 text-sm">Email: contact@yourbrand.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
