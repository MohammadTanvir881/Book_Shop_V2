/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/redux/features/auth/authApi';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '@/redux/useAuth';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const AllBooks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // State for pagination and filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [localRatings, setLocalRatings] = useState<Record<string, number>>({});
  const [updateProduct] = useUpdateProductMutation();

  // Get all products for filter options
  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  // Extract unique authors for dropdown
  const uniqueAuthors = [
    ...new Set(allProducts.map((product: any) => product.author)),
  ];

  // Main query with all filters
  const { data, isLoading, error, refetch } = useGetProductsQuery(
    {
      page,
      limit,
      searchTerm: searchTerm || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      category: category || undefined,
      author: author || undefined,
    },
    { pollingInterval: 10000 }
  );

  const products = data?.result || [];
  const totalProducts = products?.length || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  // Update local ratings when products change
  useEffect(() => {
    const newLocalRatings: Record<string, number> = {};
    products.forEach((product: any) => {
      if (product.rating) {
        newLocalRatings[product._id] = product.rating;
      }
    });
    setLocalRatings(newLocalRatings);
  }, [products]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, minPrice, maxPrice, category, author, limit]);

  // Rating handler
  const handleRating = async (productId: string, newRating: number) => {
    try {
      setLocalRatings((prev) => ({
        ...prev,
        [productId]: newRating,
      }));

      await updateProduct({
        id: productId,
        data: { rating: newRating },
      }).unwrap();

      refetch();
    } catch (error) {
      console.error('Failed to update rating:', error);
      setLocalRatings((prev) => ({
        ...prev,
        [productId]:
          products.find((p: any) => p._id === productId)?.rating || 0,
      }));
    }
  };

  // Search and filter handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setCategory('');
    setAuthor('');
    setPage(1);
    setLimit(12);
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

  // Generate pagination range
  const getPaginationRange = () => {
    const maxVisiblePages = 5;
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageSizeOptions = [12, 24, 36, 48];

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <p className="font-bold">Error loading books!</p>
        <p>Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 relative pb-2">
          Our Book Collection
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Title, author, category"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <select
                  id="author"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                >
                  <option value="">All Authors</option>
                  {uniqueAuthors.map((auth) => (
                    <option key={auth} value={auth}>
                      {auth}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <label htmlFor="limit" className="text-sm font-medium text-gray-700">
                  Show:
                </label>
                <select
                  id="limit"
                  className="rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border text-sm transition duration-300"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 text-sm font-medium"
                >
                  Reset Filters
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{(page - 1) * limit + 1}-{Math.min(page * limit, totalProducts)}</span> of{' '}
            <span className="font-semibold">{totalProducts}</span> books
          </p>
        </div>

        {/* Books Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-lg text-gray-500 mb-4">
              No books found matching your criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  data-aos="fade-up"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 hover:opacity-90"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                      ${product.price}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {product.author}</p>
                    <p className="text-xs text-gray-500 mb-3 capitalize">Category: {product.category}</p>

                    {/* Star Rating */}
                    <div className="mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(product._id, star)}
                            className="focus:outline-none"
                            aria-label={`Rate ${star} star`}
                          >
                            <FaStar
                              className={`text-xl ${
                                star <= (localRatings[product._id] || 0)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-l-lg border border-gray-300 text-sm font-medium ${
                      page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>

                  {/* First Page */}
                  {page > 3 && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                          page === 1
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        1
                      </button>
                      {page > 4 && (
                        <span className="px-4 py-2 border border-gray-300 bg-white text-gray-700">
                          ...
                        </span>
                      )}
                    </>
                  )}

                  {/* Middle Pages */}
                  {getPaginationRange().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                        page === pageNum
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Last Page */}
                  {page < totalPages - 2 && (
                    <>
                      {page < totalPages - 3 && (
                        <span className="px-4 py-2 border border-gray-300 bg-white text-gray-700">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => setPage(totalPages)}
                        className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                          page === totalPages
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-r-lg border border-gray-300 text-sm font-medium ${
                      page === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooks;