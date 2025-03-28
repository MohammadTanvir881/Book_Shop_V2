import { useState } from 'react';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/redux/features/auth/authApi';
import { FaStar } from 'react-icons/fa';

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hoverRating, setHoverRating] = useState(0);
  const [updateProduct] = useUpdateProductMutation();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page,
    limit,
  });
  const products = data?.result ?? [];
  const totalProducts = data?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleNext = () => page < totalPages && setPage((prev) => prev + 1);
  const handlePrev = () => page > 1 && setPage((prev) => prev - 1);

  const handleRating = async (productId: string, newRating: number) => {
    try {
      await updateProduct({
        id: productId,
        data: { rating: newRating },
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error loading books!</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 pt-12 mb-6">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Image with no padding/margin/gap */}
            <div className="w-80 h-42 flex items-center justify-center bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full"
              />
            </div>

            {/* Content with padding */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Author: {product.author}</p>
              <p className="text-gray-800">Price: ${product.price}</p>

              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Rate this book:</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        product._id && handleRating(product._id, star)
                      }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-xl focus:outline-none"
                    >
                      <FaStar
                        className={
                          star <= (hoverRating || product.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="self-center text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
