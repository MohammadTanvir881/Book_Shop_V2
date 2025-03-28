/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsQuery({ limit: 6 });
  const products = data?.result || [];

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleViewAll = () => {
    navigate('allbooks');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-60 w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          <span className="text-gray-800">Featured Products</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium products
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any, index: number) => (
              <div
                key={product._id}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-gray-800 rounded-2xl opacity-25 group-hover:opacity-50 blur transition-all duration-300"></div>
                <Card className="relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <span className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <CardHeader className="">
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 font-medium">
                      by {product.author}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            (24)
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg px-4 py-2 transition-colors duration-200"
                        onClick={() =>
                          navigate(`/dashboard/allbooks/${product._id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center" data-aos="fade-up">
            <Button
              onClick={handleViewAll}
              className=" bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <h1>View All</h1>
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
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
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No featured products available
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We're currently updating our collection. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
