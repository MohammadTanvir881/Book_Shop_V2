import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const TestimonialSection = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  const generateTestimonials = () => {
    const ratedProducts = allProducts.filter(
      (product) => product.rating && product.rating > 0,
    );

    return ratedProducts.slice(0, 3).map((product, index) => ({
      id: product._id || index,
      name: product.author || `Customer ${index + 1}`,
      productName: product.name || 'Book',
      role: 'Verified Reader',
      rating: product.rating,
      comment: product.description || `"${product.name} exceeded my expectations in every way!"`,
      avatar: product.image || `https://ui-avatars.com/api/?name=${product.author || 'Customer'}&background=059669&color=fff`,
    }));
  };

  const calculateRatingStats = () => {
    const ratedProducts = allProducts.filter((product) => product.rating);
    const totalRatings = ratedProducts.length;

    if (totalRatings === 0) return null;

    const averageRating =
      ratedProducts.reduce((sum, product) => sum + product.rating, 0) /
      totalRatings;
    const ratingDistribution = [0, 0, 0, 0, 0];

    ratedProducts.forEach((product) => {
      if (product.rating >= 1 && product.rating <= 5) {
        ratingDistribution[5 - Math.floor(product.rating)]++;
      }
    });

    return {
      average: averageRating.toFixed(1),
      total: totalRatings,
      distribution: ratingDistribution.map((count) =>
        Math.round((count / totalRatings) * 100),
      ),
    };
  };

  const testimonials = generateTestimonials();
  const ratingStats = calculateRatingStats();

  if (!ratingStats || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full mb-4">
            Testimonials
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            data-aos="fade-up"
          >
            What Our Readers Say
          </h2>
          <p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Discover why thousands of readers trust our recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-green-100 group-hover:border-green-500 transition-colors duration-300"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Reviewed: <span className="text-green-600 dark:text-green-400 font-semibold">{testimonial.productName}</span>
                </p>
              </div>

              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-green-100 dark:text-green-900 text-3xl absolute -top-2 -left-1" />
                <p className="text-gray-700 dark:text-gray-300 pl-8 italic">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary Section */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 max-w-4xl mx-auto border border-gray-100 dark:border-gray-700"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left mb-8 md:mb-0 md:mr-12">
              <div className="text-5xl font-bold text-green-600 dark:text-green-500 mb-3">
                {ratingStats.average}
                <span className="text-2xl text-gray-500">/5</span>
              </div>
              <div className="flex justify-center md:justify-start mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${i < Math.floor(Number(ratingStats.average)) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Based on <span className="font-semibold">{ratingStats.total}</span> verified reviews
              </p>
            </div>

            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((stars, index) => (
                <div key={stars} className="flex items-center mb-3">
                  <span className="w-10 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {stars} star
                  </span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mx-3">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${ratingStats.distribution[index]}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {ratingStats.distribution[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16" data-aos="fade-up">
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;