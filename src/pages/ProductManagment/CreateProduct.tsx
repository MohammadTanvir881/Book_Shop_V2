/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  } = useGetProductsQuery({ page: 1, limit: 10 }); // Get products and refetch method
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate(); // To redirect after successful creation

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    stock: '',
    quantity: '',
    author: '',
    model: '',
  });

  const [errors, setErrors] = useState<any>({});

  const products = Array.isArray(productsData) ? productsData : []; // Ensure products is always an array

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
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

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
    };

    try {
      // Make the API request to create the product
      await createProduct(productData).unwrap();

      Swal.fire({
        title: 'Success!',
        text: 'Product created.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Refetch the products after creation to ensure the UI updates
      refetch();

      // Reset form and errors after successful creation
      setFormData({
        name: '',
        brand: '',
        price: '',
        category: '',
        stock: '',
        quantity: '',
        author: '',
        model: '',
      });
      setErrors({});

      // Redirect to the product management page
      navigate('/dashboard/productManage');
    } catch (error: any) {
      console.error('Error creating product:', error); // Log for debugging
      Swal.fire({
        title: 'Error!',
        text: `Product creation failed: ${error?.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <input
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors[key] && (
              <p className="text-red-500 text-sm">{errors[key]}</p>
            )}
          </div>
        ))}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Create Product
        </button>
      </form>

      {/* Display the product list */}
      <div className="mt-8">
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border-b py-2">
              <span className="font-bold">{product.name}</span> - $
              {product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateProduct;
