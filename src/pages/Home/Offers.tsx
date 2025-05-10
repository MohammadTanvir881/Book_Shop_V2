import { FaStar, FaRegClock, FaBookOpen, FaChevronRight } from 'react-icons/fa';
import { GiBookmarklet, GiBookshelf } from 'react-icons/gi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function SpecialOffers() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  const offers = [
    {
      id: 1,
      title: 'Summer Reading Bundle',
      description:
        'Get 3 bestsellers for the price of 2. Curated by our experts.',
      discount: '30% OFF',
      icon: <FaBookOpen className="text-3xl text-green-600" />,
      tag: 'Limited Time',
      bgColor:
        'bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700',
      tagColor:
        'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    {
      id: 2,
      title: 'Premium Membership',
      description:
        'Join our club for exclusive discounts, early access, and free shipping.',
      discount: '20% OFF',
      icon: <FaStar className="text-3xl text-green-600" />,
      tag: 'Popular',
      bgColor:
        'bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700',
      tagColor:
        'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    {
      id: 3,
      title: 'Classics Collection',
      description:
        'Timeless literature at special prices. Build your personal library.',
      discount: '25% OFF',
      icon: <GiBookmarklet className="text-3xl text-green-600" />,
      tag: 'Curated',
      bgColor:
        'bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700',
      tagColor:
        'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
  ];

  return (
    <section className="py-8 lg:py-10 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200 mb-4">
            Special Promotions
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Exclusive Book Offers
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our special promotions and build your perfect collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`${offer.bgColor} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700`}
              data-aos="fade-up"
              data-aos-delay={offer.id * 100}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600">
                    {offer.icon}
                  </div>
                  <span
                    className={`px-3 py-1 ${offer.tagColor} text-xs font-medium rounded-full flex items-center`}
                  >
                    {offer.tag === 'Limited Time' && (
                      <FaRegClock className="mr-1" />
                    )}
                    {offer.tag}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {offer.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {offer.discount}
                  </span>
                  <button className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-700 transition-all duration-300 group/button">
                    Grab Offer
                    <FaChevronRight className="h-3 w-3 ml-2 transition-transform group-hover/button:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 font-medium rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-700 transition-all duration-300 group/view-all">
            View All Offers
            <GiBookshelf className="ml-2 text-xl transition-transform group-hover/view-all:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
