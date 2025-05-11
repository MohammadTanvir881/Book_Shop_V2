import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '@/redux/features/auth/authApi';
import { Link } from 'react-router-dom';
import { Product } from './productTypes';
import { FaEdit, FaTrash, FaStar, FaPlus } from 'react-icons/fa';
import React from 'react';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@mui/material';

const ProductManage = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const [products, setProducts] = React.useState<Product[]>([]);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page,
    limit,
  });
  const [deleteProduct] = useDeleteProductMutation();

  React.useEffect(() => {
    refetch();
    if (data) {
      setProducts((data as any)?.result ?? []);
    }
  }, [data]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading products!
      </div>
    );
  }

  const totalProducts = (data as any)?.total ?? 0;

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981', // green-500
      cancelButtonColor: '#EF4444', // red-500
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId),
          );
          await deleteProduct(productId).unwrap();

          Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted.',
            icon: 'success',
            confirmButtonColor: '#10B981',
          });
          await refetch();
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the product.',
            icon: 'error',
            confirmButtonColor: '#10B981',
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Product Management
        </h1>
        <Link
          to="/dashboard/products/create"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-colors mt-4 md:mt-0"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {products.length > 0 ? (
                products.map((product: Product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{product.rating || 'N/A'}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={product.stock > 0 ? 'standard' : 'dot'}
                        className="text-xs"
                      >
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/dashboard/products/edit/${product._id}`}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <FaEdit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id!)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
          <span className="font-medium">{Math.min(page * limit, totalProducts)}</span> of{' '}
          <span className="font-medium">{totalProducts}</span> products
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handlePrev}
            disabled={page === 1}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={products.length < limit}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductManage;