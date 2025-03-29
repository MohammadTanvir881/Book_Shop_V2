import AOS from 'aos';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
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
    },
    {
      title: 'The Sealed Nectar',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKb55hltaeySkEi-evdg1S4sU_ezUhQuS9Vw&s',
      rating: 4.9,
    },
    {
      title: 'Fortress of the Muslim',
      author: 'Said bin Ali bin Wahaf Al-Qahtani',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhf7UwI1fs0phMix5a0UxxwcCQcxCVBf53w&s',
      rating: 4.8,
    },
    {
      title: 'Don’t Be Sad',
      author: 'Dr. Aaidh ibn Abdullah al-Qarni',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLgBJjbuRwkbMx60DyRI-J6TwLH2XzHGe3qg&s',
      rating: 4.7,
    },
    {
      title: 'In the Footsteps of the Prophet',
      author: 'Tariq Ramadan',
      image: 'https://m.media-amazon.com/images/I/51JGmkS3SXL._SL500_.jpg',
      rating: 4.6,
    },
    {
      title: 'Islam and the Future of Tolerance',
      author: 'Sam Harris & Maajid Nawaz',
      image:
        'https://ia802307.us.archive.org/BookReader/BookReaderPreview.php?id=islamfutureoftol0000harr&subPrefix=islamfutureoftol0000harr&itemPath=/17/items/islamfutureoftol0000harr&server=ia802307.us.archive.org&page=leaf7&fail=preview&&scale=2&rotate=0',
      rating: 4.5,
    },
  ];

  return (
    <div className="py-16 px-4 mt-10 md:px-16">
      <h2
        data-aos="flip-right"
        className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
      >
        Recommended Islamic Books
      </h2>

      {/* First Row with 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {books.slice(0, 3).map((book, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            data-aos="zoom-in"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              {book.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">by {book.author}</p>
            <div className="flex items-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(book.rating) ? '' : 'opacity-50'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Second Row with 6 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {books.slice(3, 6).map((book, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            data-aos="zoom-in"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              {book.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">by {book.author}</p>
            <div className="flex items-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(book.rating) ? '' : 'opacity-50'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* YouTube Video Section */}
      <div className="mt-30  text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Islamic Book Review & Insights
        </h2>
        <div
          className="relative w-full max-w-3xl mx-auto"
          style={{ paddingBottom: '56.25%' }}
        >
          {' '}
          {/* Responsive Video */}
          <ReactPlayer
            url="https://youtu.be/I-s64gzQlrs?si=tV8UacFbyOvqQur1"
            controls
            width="100%"
          />
        </div>
      </div>

      <div className="flex justify-center items-center pt-20 pb-10">
        <Link to="/">
          <button
            className="bg-blue-500 hover:bg-blue-700
     text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recommended;
