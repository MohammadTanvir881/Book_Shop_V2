import AOS from 'aos';
import { useEffect } from 'react';
import { FaStar, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const Recommended = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const books = [
    {
      title: 'The Quran (English Translation)',
      author: 'Saheeh International',
      image:
        'https://myfreequran.net/wp-content/uploads/2022/04/quran-saheeh-1-1.jpg',
      rating: 5,
      category: 'Holy Scripture',
    },
    {
      title: 'The Sealed Nectar',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKb55hltaeySkEi-evdg1S4sU_ezUhQuS9Vw&s',
      rating: 4.9,
      category: 'Prophetic Biography',
    },
    {
      title: 'Fortress of the Muslim',
      author: 'Said bin Ali bin Wahaf Al-Qahtani',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhf7UwI1fs0phMix5a0UxxwcCQcxCVBf53w&s',
      rating: 4.8,
      category: 'Daily Prayers',
    },
    {
      title: "Don't Be Sad",
      author: 'Dr. Aaidh ibn Abdullah al-Qarni',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLgBJjbuRwkbMx60DyRI-J6TwLH2XzHGe3qg&s',
      rating: 4.7,
      category: 'Spiritual Growth',
    },
    {
      title: 'In the Footsteps of the Prophet',
      author: 'Tariq Ramadan',
      image: 'https://m.media-amazon.com/images/I/51JGmkS3SXL._SL500_.jpg',
      rating: 4.6,
      category: 'Prophetic Studies',
    },
    {
      title: 'Islam and the Future of Tolerance',
      author: 'Sam Harris & Maajid Nawaz',
      image:
        'https://www.stanfords.co.uk/media/catalog/product/700x700/7/e/7e661a3457e4ce3c8c79b4b219a8358e8366ffc3c045bf608c77aaf07cd3e614.jpeg',
      rating: 4.5,
      category: 'Interfaith Dialogue',
    },
  ];

  return (
    <div className="py-16 px-4 md:px-16 bg-white dark:bg-gray-900">
      {/* Header with decorative elements */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative">
        <div
          className="absolute -top-18 left-1/2 transform -translate-x-1/2 text-green-500 opacity-20"
          data-aos="fade-down"
        >
          <FaBookOpen size={80} />
        </div>
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative z-10"
        >
          Sacred <span className="text-green-500">Readings</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Curated collection of Islamic literature for spiritual enrichment
        </p>
      </div>

      {/* Masonry-inspired grid layout */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-20">
        {books.map((book, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-24 h-32 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-gray-700 rounded-full mb-2">
                    {book.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {book.author}
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} text-sm`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="mt-4 inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                data-aos="fade-in"
                data-aos-delay="300"
              >
                Explore this book <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Video Section with modern treatment */}
   

      {/* Minimalist CTA */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-2 border-2 border-green-500 text-green-500 dark:text-green-400 font-medium rounded-full hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
          data-aos="fade-up"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Recommended;
