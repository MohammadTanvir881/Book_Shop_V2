import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '@/redux/useAuth';
import { Product } from '../ProductManagment/productTypes';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, error, isLoading } = useGetProductsQuery({ limit: 8 });

  const products = (data?.result || []) as Product[];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleViewAll = () => {
    navigate('/allbooks');
  };

  const handleViewDetails = (productId: string) => {
    if (isAuthenticated) {
      navigate(`/products/${productId}`);
    } else {
      navigate('/login', {
        state: {
          from: `/products/${productId}`,
          message: 'Please login to view product details',
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 max-w-7xl mx-auto">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm rounded-xl overflow-hidden"
          >
            <Skeleton className="h-48 w-full rounded-t-xl" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg font-medium">
          Error fetching products.
        </p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="relative inline-block">
            <span className="relative z-10">Featured Products</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-green-500/30 -rotate-1"></span>
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover our curated collection of premium books
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={50 * (products.indexOf(product) % 4)}
              >
                <Card className="h-full flex flex-col border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-green-500/30">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  </div>

                  <CardHeader className="px-4 pt-4 pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      by {product.author}
                    </p>
                  </CardHeader>

                  <CardContent className="px-4 pb-4 mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({product.rating || 0})
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                      onClick={() =>
                        product._id && handleViewDetails(product._id)
                      }
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center" data-aos="fade-up">
            <Button
              onClick={handleViewAll}
              className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 rounded-lg font-semibold"
            >
              View All Products
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-16" data-aos="fade-up">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No featured products available
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We're currently updating our collection. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;