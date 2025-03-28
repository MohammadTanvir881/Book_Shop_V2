/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '@/redux/features/auth/authApi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const {
    data: productsData,
    isLoading,
    refetch,
  } = useGetProductsQuery({ page: 1, limit: 10 });
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();

  // Valid categories from your backend model
  const validCategories = [
    'Religious',
    'Fiction',
    'Science',
    'Self Development',
    'Poetry',
  ];

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    stock: '',
    quantity: '',
    author: '',
    model: '',
    imageUrl: '',
    rating: '',
    description: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [imagePreview, setImagePreview] = useState('');

  const products = Array.isArray(productsData) ? productsData : [];

  const checkDuplicateProduct = () => {
    return products.some(
      (product: any) =>
        product.name.trim().toLowerCase() ===
          formData.name.trim().toLowerCase() ||
        product.model.trim().toLowerCase() ===
          formData.model.trim().toLowerCase(),
    );
  };

  const validateField = (field: string, value: string) => {
    setErrors((prevErrors: any) => {
      const newErrors = { ...prevErrors };
      if (!value) {
        newErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (
        field === 'rating' &&
        (parseFloat(value) < 0 || parseFloat(value) > 5)
      ) {
        newErrors[field] = 'Rating must be between 0 and 5';
      } else if (field === 'category' && !validCategories.includes(value)) {
        newErrors[field] =
          `Category must be one of: ${validCategories.join(', ')}`;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Update image preview when image URL changes
    if (name === 'imageUrl') {
      setImagePreview(value);
    }

    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'rating') {
        // Rating is optional
        newErrors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (!formData.imageUrl) {
      newErrors.imageUrl = 'Image URL is required';
    }

    // Additional category validation
    if (formData.category && !validCategories.includes(formData.category)) {
      newErrors.category = `Category must be one of: ${validCategories.join(', ')}`;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (isLoading) {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (checkDuplicateProduct()) {
      Swal.fire({
        title: 'Duplicate Product!',
        text: 'Product already exists.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      quantity: parseInt(formData.quantity, 10),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      image: formData.imageUrl,
    };

    try {
      await createProduct(productData).unwrap();

      Swal.fire({
        title: 'Success!',
        text: 'Product created.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      refetch();

      setFormData({
        name: '',
        brand: '',
        price: '',
        category: '',
        stock: '',
        quantity: '',
        author: '',
        model: '',
        imageUrl: '',
        rating: '',
        description: '',
      });
      setImagePreview('');
      setErrors({});

      navigate('/dashboard/productManage');
    } catch (error: any) {
      console.error('Error creating product:', error);
      Swal.fire({
        title: 'Error!',
        text: `Product creation failed: ${error?.data?.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Regular text inputs */}
        {['name', 'brand', 'price', 'stock', 'quantity', 'author', 'model'].map(
          (field) => (
            <div key={field}>
              <input
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ),
        )}

        {/* Category select dropdown */}
        <div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {validCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Rating input */}
        <div>
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}
        </div>

        {/* Description textarea */}
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Image URL input */}
        <div>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
          )}
        </div>

        {/* Image preview section - only shown when there's an image URL */}
        {formData.imageUrl && (
          <div className="mt-2 border rounded-md p-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </h3>
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-full h-48 object-contain rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/300?text=Image+not+available';
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* Display the product list */}
      <div className="mt-8">
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border-b py-2 flex items-center">
              <img
                src={product.image || 'https://via.placeholder.com/50'}
                alt={product.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <span className="font-bold">{product.name}</span> - $
                {product.price}
                <div className="text-sm text-gray-500">
                  Category: {product.category} | Rating:{' '}
                  {product.rating || 'N/A'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateProduct;
