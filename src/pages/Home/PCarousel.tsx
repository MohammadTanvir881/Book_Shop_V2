import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const images = [
  '/src/assets/images/bs-2.jpg',
  '/src/assets/images/bs-1.jpg',
  '/src/assets/images/bs-3.jpg',
  '/src/assets/images/bs-4.jpg',
];

const PCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 4000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative  w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] mt-17 mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Banner ${index + 1}`}
            className="w-full object-cover"
          />
        ))}
      </div>

      <button
        title="Previous Slide"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        title="Next Slide"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="absolute inset-0    bg-opacity-40 flex items-center justify-center ">
          <h1
            data-aos-duration="2000"
            data-aos-easing="ease-out-cubic"
            data-aos="zoom-out-left"
            className="text-blue-300 -mt-40  lg:-mt-120 sm:mr-40 md:mr-80 lg:mr-140 text-lg
         text-5xl md:text-6xl lg:text-8xl font-bold font-serif "
          >
            Grab Your Favorite Book
            <div className="lg:-mt-28 lg:ml-80 ml-30 ">
              <button
                data-aos-duration="2000"
                data-aos-easing="ease-out-cubic"
                data-aos="flip-right"
                className="bg-transparent lg:text-2xl  hover:bg-blue-500
             text-white font-semibold hover:text-white w-40 lg:h-12 border
              border-blue-500 hover:border-transparent rounded"
              >
                <Link to="allbooks">Order Now</Link>
              </button>
            </div>
          </h1>
        </div>

        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PCarousel;
