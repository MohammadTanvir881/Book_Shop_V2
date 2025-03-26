/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '@/redux/features/auth/authApi';
import { Link } from 'react-router-dom';
import { Product } from './productTypes';
import { FaEdit, FaTrash } from 'react-icons/fa';
import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert

const ProductManage = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10; // Limit to 10 products per page
  const [products, setProducts] = React.useState<Product[]>([]); // State to hold products

  // Fetch data based on the page and limit
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
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent page going below 1
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">
        Error loading products!
      </p>
    );

  const totalProducts = (data as any)?.total ?? 0; // Total number of products from the server

  // Handle deletion with SweetAlert
  const handleDelete = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        confirmButton: 'bg-red-600 text-white',
        cancelButton: 'bg-gray-400 text-white',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Optimistically update the UI by removing the product from the list
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId),
          );

          // Perform the actual deletion
          await deleteProduct(productId).unwrap();

          // Refetch the products list to ensure UI is updated
          refetch();

          Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the product.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Product List
      </h1>
      <div className="text-right mb-4">
        <Link
          to="/dashboard/products/create"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr className="font-bold text-xs md:text-sm">
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Product Name
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Price</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Category
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700 hidden md:table-cell">
                Author
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Brand</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700 hidden md:table-cell">
                Model
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Stock</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700 hidden md:table-cell">
                Quantity
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product: Product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 text-xs md:text-sm"
                >
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    ${product.price}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700 hidden md:table-cell">
                    {product.author}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.brand}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700 hidden md:table-cell">
                    {product.model}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.stock}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700 hidden md:table-cell">
                    {product.quantity}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700 flex space-x-4">
                    <Link
                      to={`/dashboard/products/edit/${product._id}`}
                      className="text-gray-800 text-lg hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id!)} // Call the delete handler
                      className="text-red-500 hover:text-red-800 transition"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-2 md:px-6 md:py-4 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-800 text-white px-2 rounded-lg shadow-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center pl-4 pr-4 text-lg">
          Page {page} of {Math.ceil(totalProducts / limit)}
        </span>
        <button
          onClick={handleNext}
          disabled={products.length < limit}
          className="bg-gray-800 text-white px-5 rounded-lg shadow-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManage;
