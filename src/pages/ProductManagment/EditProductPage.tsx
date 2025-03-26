/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '@/redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetProductQuery(id!, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
  });
  const [updateProduct] = useUpdateProductMutation();
  const [componentKey, setComponentKey] = useState(0);

  const [productDetails, setProductDetails] = useState({
    name: '',
    price: 0,
    category: '',
    author: '',
    brand: '',
    stock: 0,
    quantity: 0,
    model: '',
  });

  useEffect(() => {
    if (data) {
      setProductDetails({
        name: data.name || '',
        price: data.price || 0,
        category: data.category || '',
        author: data.author || '',
        brand: data.brand || '',
        stock: data.stock || 0,
        quantity: data.quantity || 0,
        model: data.model || '',
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]:
        name === 'price' || name === 'stock' || name === 'quantity'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      console.error('Product ID is missing.');
      return;
    }

    try {
      await updateProduct({ id, data: productDetails }).unwrap();

      // ✅ Update করার পর refetch() কল করা
      await refetch();

      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/dashboard/productManage');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error updating product:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div key={componentKey} className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Edit Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            placeholder="Enter product category"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={productDetails.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-semibold text-gray-700"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productDetails.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-semibold text-gray-700"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={productDetails.model}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-semibold text-gray-700"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            name="stock"
            value={productDetails.stock}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-gray-700"
          >
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={productDetails.quantity}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
