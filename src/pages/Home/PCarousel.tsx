import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const images = [
  'https://i.postimg.cc/7hGqkrpq/bs-1.jpg',
  'https://i.postimg.cc/C5szRqFc/bs-2.jpg',
  'https://i.postimg.cc/G3xF8BS0/bs-3.jpg',
  'https://i.postimg.cc/G3vCkRkn/bs-4.jpg',
];

const PCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full  h-[400px] md:h-[600px] mx-auto overflow-hidden rounded-sm shadow-xl">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50  flex items-center justify-center">
              <div className="text-center px-4">
                <h1
                  data-aos="fade-down"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif tracking-tight"
                >
                  Discover Your Next{' '}
                  <span className="text-blue-300">Favorite Read</span>
                </h1>
                <div data-aos="fade-up" data-aos-delay="300">
                  <Link
                    to="allbooks"
                    className="inline-block px-8 py-3 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Browse Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-400 w-6'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PCarousel;
