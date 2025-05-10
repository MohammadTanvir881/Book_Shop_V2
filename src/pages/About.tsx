import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
} from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <div className={theme}>
      <main className="py-16 px-4 mt-10 md:px-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <section className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div
            data-aos="fade-down"
            className="mb-16 p-8 rounded-xl bg-green-50 dark:bg-gray-800 shadow-lg"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to <span className="text-green-500">BookShop</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Your premier online destination for books of all genres. Whether
              you're a passionate reader, a student, or looking for the perfect
              gift, we have something for everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div
            data-aos="fade-right"
            className="mb-20 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-green-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-semibold text-green-500 dark:text-green-400">
                Our Mission
              </h2>
              <div className="w-16 h-1 bg-green-500 rounded-full ml-4"></div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              At BookShop, we believe in the transformative power of books to
              educate, inspire, and change lives.
            </p>
            <ul className="text-left space-y-4 text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-xl">
              {[
                'Provide a vast collection of books at affordable prices',
                'Offer a seamless and user-friendly shopping experience',
                'Ensure fast and reliable delivery to your doorstep',
                'Promote a love for reading and lifelong learning',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <span className="text-green-500 dark:text-green-400 mt-1">
                    <FaArrowRight />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision Section */}
          <div
            data-aos="fade-left"
            className="mb-20 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-green-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-semibold text-green-500 dark:text-green-400">
                Our Vision
              </h2>
              <div className="w-16 h-1 bg-green-500 rounded-full ml-4"></div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              We envision a world where everyone has access to quality books
              that enrich their lives and expand their horizons.
            </p>
            <ul className="text-left space-y-4 text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-xl">
              {[
                'Become the leading online bookstore in the region',
                'Create a community of passionate readers',
                'Support local authors and publishers',
                'Innovate with digital reading experiences',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <span className="text-green-500 dark:text-green-400 mt-1">
                    <FaArrowRight />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us Section */}
          <div
            data-aos="zoom-in"
            className="mb-20 p-8 rounded-xl bg-green-50 dark:bg-gray-800 shadow-lg"
          >
            <h2 className="text-3xl font-semibold text-green-500 dark:text-green-400 mb-8">
              Why Choose BookShop?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Extensive Collection',
                  content:
                    'Wide range of books across all categories and genres',
                },
                {
                  title: 'Secure Shopping',
                  content: 'Multiple secure and easy payment options',
                },
                {
                  title: 'Excellent Support',
                  content:
                    'Dedicated customer service team for all your queries',
                },
                {
                  title: 'Great Value',
                  content:
                    'Regular discounts and special offers for our customers',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  data-aos="flip-up"
                  data-aos-delay={index * 150}
                  className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <h3 className="text-xl font-bold text-green-500 dark:text-green-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <div
            data-aos="fade-up"
            className="mb-20 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md"
          >
            <p className="text-2xl text-gray-900 dark:text-white mb-6">
              Join us in our journey to spread the joy of reading!
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Happy shopping at{' '}
              <span className="font-bold text-green-500 dark:text-green-400">
                BookShop
              </span>
              !
            </p>
          </div>

          {/* Contact Section */}
          <div
            data-aos="fade-in"
            className="p-8 rounded-xl bg-green-50 dark:bg-gray-800 shadow-lg"
          >
            <h2 className="text-3xl font-semibold text-green-500 dark:text-green-400 mb-8">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div
                data-aos="fade-right"
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-green-500 dark:text-green-400 mb-3">
                  Contact Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> support@bookshop.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Phone:</strong> +123 456 7890
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Address:</strong> 123 Book Street, Knowledge City
                </p>
              </div>
              <div
                data-aos="fade-left"
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-green-500 dark:text-green-400 mb-3">
                  Follow Us
                </h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 text-3xl transition duration-300"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 text-3xl transition duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 text-3xl transition duration-300"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <Link to="/">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center mx-auto"
                data-aos="zoom-in"
              >
                Back To Home
                <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
