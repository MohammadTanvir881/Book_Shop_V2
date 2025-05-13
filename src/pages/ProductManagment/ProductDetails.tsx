import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '@/redux/features/auth/authApi';
import { FaStar, FaShoppingCart, FaHeart, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/utils/ErrorMessage';
import LoadingSpinner from '@/utils/LoadingSpinner';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  description?: string;
  brand?: string;
  category?: string;
  stock: number;
  specifications?: string[];
  features?: string[];
}

interface ApiResponse {
  result: Product;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductQuery(id || '');

  const product = (data as unknown as ApiResponse)?.result;

  const handleBuyNow = () => {
    if (product) {
      navigate('/checkout', { state: { product } });
    }
  };

  if (isLoading) return <div className='flex justify-center items-center min-h-screen'><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message="Failed to load product details" />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Main Product Section */}
        <div className="md:flex">
          {/* Product Image Gallery */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="relative h-96 bg-gray-50 rounded-lg flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <FaHeart />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <FaShareAlt />
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-3">
                {product.category || 'General'}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= (product.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  ({product.rating?.toFixed(1) || 'No'} ratings)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-green-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 text-sm mt-1">
                  You save ${(product.originalPrice - product.price).toFixed(2)}{' '}
                  (
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  %)
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-600">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Brand
                </h3>
                <p className="text-gray-900 font-medium">
                  {product.brand || 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Availability
                </h3>
                <p
                  className={`font-medium ${
                    product.stock > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className={`flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaShoppingCart className="mr-2" />
                Buy Now
              </button>
            </div>

            {product.stock <= 0 && (
              <p className="mt-3 text-red-500 text-sm">
                This product is currently out of stock
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t border-gray-200 p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specifications?.length ? (
                    product.specifications.map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">{spec}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No specifications available</p>
                  )}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features?.length ? (
                    product.features.map((feature, index) => (
                      <li key={index} className="flex">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No features available</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
