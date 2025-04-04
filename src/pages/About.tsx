import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <div className={theme}>
      <main className="py-16 px-4 mt-10 md:px-16">
        <section className="text-center max-w-3xl mx-auto">
          <h1
            data-aos="flip-left"
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Welcome to BookShop
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Your one-stop online destination for books of all genres. Whether
            you're a passionate reader, a student, or looking for the perfect
            gift, we have something for everyone.
          </p>

          {/* Mission Section */}
          <h2
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="text-3xl font-semibold text-blue-500 dark:text-indigo-400 mt-20 mb-4"
          >
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            At BookShop, we believe in the power of books to educate, inspire,
            and transform lives. Our goal is to:
          </p>
          <ul className="text-left space-y-3 text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-xl">
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>
                Provide a vast collection of books at affordable prices.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>
                Offer a seamless and user-friendly shopping experience.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Ensure fast and reliable delivery to your doorstep.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Promote a love for reading and lifelong learning.</span>
            </li>
          </ul>

          {/* Mission Section */}
          <h2
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="text-3xl font-semibold text-blue-500 dark:text-indigo-400 mb-4 mt-20"
          >
            Our Vission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            At BookShop, we believe in the power of books to educate, inspire,
            and transform lives. Our goal is to
          </p>
          <ul className="text-left space-y-3 text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-xl">
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>
                Provide a vast collection of books at affordable prices.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>
                Offer a seamless and user-friendly shopping experience.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Ensure fast and reliable delivery to your doorstep.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Promote a love for reading and lifelong learning.</span>
            </li>
          </ul>

          {/* Why Choose Us Section */}
          <h2
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="text-3xl font-semibold text-blue-500 dark:text-indigo-400 mb-4 mt-10"
          >
            Why Choose Us?
          </h2>
          <ul className="text-left space-y-3 text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-xl">
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Wide range of books across all categories.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Secure and easy payment options.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Excellent customer service for all your queries.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-indigo-600 dark:text-indigo-400">✔</span>
              <span>Regular discounts and special offers.</span>
            </li>
          </ul>

          {/* Closing Statement */}
          <p className="mt-6 text-xl text-gray-900 dark:text-white">
            Join us in our journey to spread the joy of reading! Happy shopping
            at{' '}
            <strong className="font-bold text-blue-500 dark:text-indigo-400">
              BookShop
            </strong>
            !
          </p>

          {/* Contact Information */}
          <h2
            data-aos="flip-left"
            className="text-3xl font-semibold text-blue-500 dark:text-indigo-400 mt-20 mb-4"
          >
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Email: support@bookshop.com
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Phone: +123 456 7890
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-white text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-white text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 dark:text-white text-2xl"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Theme Toggle Button */}
          <div className="mt-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              .
            </button>
          </div>

          <div className="flex justify-center items-center pt-20 pb-10">
            <Link to="/">
              <button
                className="bg-gray-800 hover:bg-blue-700
               text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Back To Home
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
