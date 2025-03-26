import { useState } from 'react';
import { useGetProductsQuery } from '@/redux/features/auth/authApi';

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // Products per page

  // Data fetching with pagination
  const { data, isLoading, error } = useGetProductsQuery({ page, limit });

  // Debugging: Check if API is returning correct data
  console.log('API Response:', data);

  const products = data?.result ?? [];
  const totalProducts = data?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error loading books!</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">Author: {product.author}</p>
            <p className="text-gray-600">Price: ${product.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
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
