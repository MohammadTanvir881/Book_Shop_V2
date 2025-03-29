/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const validCategories = [
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ];

  const [originalProduct, setOriginalProduct] = useState({
    name: '',
    price: 0,
    category: '',
    author: '',
    brand: '',
    stock: 0,
    quantity: 0,
    model: '',
    image: '',
    description: '',
    rating: 0,
    discount: 0,
    tags: [],
    features: [],
  });

  const [changedFields, setChangedFields] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState(originalProduct.image);

  useEffect(() => {
    if (data) {
      setOriginalProduct({
        name: data.name || '',
        price: data.price || 0,
        category: data.category || '',
        author: data.author || '',
        brand: data.brand || '',
        stock: data.stock || 0,
        quantity: data.quantity || 0,
        model: data.model || '',
        image: data.image || '',
        description: data.description || '',
        rating: data.rating || 0,
        discount: data.discount || 0,
        tags: data.tags || [],
        features: data.features || [],
      });

      setImagePreview(data.image || '');
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const newValue = [
      'price',
      'stock',
      'quantity',
      'rating',
      'discount',
    ].includes(name)
      ? Number(value)
      : value;

    if (originalProduct[name as keyof typeof originalProduct] !== newValue) {
      setChangedFields((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setChangedFields((prev) => {
        const newFields = { ...prev };
        delete newFields[name];
        return newFields;
      });
    }
  };

  const handleArrayChange = (name: string, value: string) => {
    const arrayValue = value.split(',').map((item) => item.trim());
    setChangedFields((prev) => ({
      ...prev,
      [name]: arrayValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setImagePreview(newValue);
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      console.error('Product ID is missing.');
      return;
    }

    try {
      await updateProduct({ id, data: changedFields }).unwrap();
      

      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/dashboard/productManage');
      });
      await refetch();
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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Edit Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={originalProduct.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              defaultValue={originalProduct.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              defaultValue={originalProduct.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              {validCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              defaultValue={originalProduct.stock}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              defaultValue={originalProduct.brand}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Model
            </label>
            <input
              type="text"
              name="model"
              defaultValue={originalProduct.model}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Image URL
          </label>
          {imagePreview && (
            <div className="mt-2 mb-4">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="h-40 w-40 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="text"
            name="image"
            defaultValue={originalProduct.image}
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={originalProduct.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            defaultValue={originalProduct.tags.join(', ')}
            onChange={(e) => handleArrayChange('tags', e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={Object.keys(changedFields).length === 0}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
