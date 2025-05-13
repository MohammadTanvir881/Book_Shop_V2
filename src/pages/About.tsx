import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import {
  // FaFacebook,
  // FaLinkedin,
  // FaTwitter,
  FaArrowRight,
  FaBookOpen,
  FaShieldAlt,
  FaHeadset,
  FaTags,
} from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { theme } = useTheme();

  return (
    <div className={theme}>
      <main className="py-16 px-4 md:px-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <section
          data-aos="fade-down"
          className="container mx-auto mb-20 p-10 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow-xl text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Discover <span className="text-green-500">BookShop</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Your premier destination for literary adventures. We curate the
              finest collection of books across all genres to satisfy every
              reader's appetite.
            </p>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8 rounded-full"></div>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
                50,000+ Titles
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                500+ Publishers
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                24/7 Support
              </span>
            </div>
          </div>
        </section>

        {/* Mission & Vision Sections */}
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Mission */}
          <div
            data-aos="fade-right"
            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg border-t-4 border-green-500"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                <span className="text-xl">1</span>
              </div>
              <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              To ignite imaginations and empower minds through accessible
              literature.
            </p>
            <ul className="space-y-3">
              {[
                'Democratize access to quality books',
                'Foster a culture of reading',
                'Support authors and publishers',
                'Deliver exceptional customer experiences',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mt-1 mr-2">
                    <FaArrowRight size={14} />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div
            data-aos="fade-left"
            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg border-t-4 border-green-500"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                <span className="text-xl">2</span>
              </div>
              <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
                Our Vision
              </h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              To be the most trusted literary companion for readers worldwide.
            </p>
            <ul className="space-y-3">
              {[
                'Expand to 50 countries by 2030',
                'Digital transformation of reading',
                'AI-powered personalized recommendations',
                'Sustainable book distribution',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mt-1 mr-2">
                    <FaArrowRight size={14} />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section data-aos="zoom-in" className="container mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why <span className="text-green-500">BookShop</span> Stands Out
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBookOpen className="text-3xl mb-4 text-green-500" />,
                title: 'Vast Collection',
                description: '200,000+ titles across all genres and categories',
              },
              {
                icon: <FaShieldAlt className="text-3xl mb-4 text-green-500" />,
                title: 'Secure Shopping',
                description: 'Bank-level security for all transactions',
              },
              {
                icon: <FaHeadset className="text-3xl mb-4 text-green-500" />,
                title: 'Dedicated Support',
                description: '24/7 customer service with real humans',
              },
              {
                icon: <FaTags className="text-3xl mb-4 text-green-500" />,
                title: 'Great Value',
                description: 'Daily deals and member-exclusive discounts',
              },
            ].map((feature, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section
          data-aos="fade-up"
          className="container mx-auto mb-20 p-10 bg-green-50 dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-green-500 dark:text-green-400 mb-12">
            What Our Readers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  'BookShop has transformed my reading habits. The recommendations are always spot on!',
                author: 'Sarah Johnson',
                role: 'Avid Reader',
              },
              {
                quote:
                  'As a student, I appreciate the academic discounts and fast delivery. Lifesaver!',
                author: 'Michael Chen',
                role: 'University Student',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-green-500 dark:text-green-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section data-aos="fade-up" className="container mx-auto text-center">
          <div className="p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Begin Your Reading Journey?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of passionate readers today and discover your
              next favorite book.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/allbooks"
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Browse Collection
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-green-500 text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
