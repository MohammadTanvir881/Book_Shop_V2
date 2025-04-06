/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCreateOrderMutation } from '@/redux/api/orderApi';
// import { useAppSelector } from '@/redux/hooks';
// import TUser from '@/pages/OrderManagment/Ordertyps';
// import { toast } from 'react-hot-toast';
// import LoadingSpinner from '@/utils/LoadingSpinner';

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   price: number;
//   stock: number;
// }

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [createOrder, { isLoading, isSuccess, data: orderData, error }] =
//     useCreateOrderMutation();
//   const user = useAppSelector((state) => state.auth.user) as TUser;
//   const product = location.state?.product as Product;

//   // Form state
//   const [quantity, setQuantity] = useState(1);
//   const [shippingAddress, setShippingAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('shurjopay');

//   // Calculate total price
//   const totalPrice = product ? (product.price * quantity).toFixed(2) : '0.00';

//   useEffect(() => {
//     if (!product) {
//       navigate('/products');
//       toast.error('No product selected for checkout');
//     }
//   }, [product, navigate]);

//   useEffect(() => {
//     if (isSuccess && orderData) {
//       // Redirect to payment URL if using shurjopay
//       if (paymentMethod === 'shurjopay' && orderData.checkout_url) {
//         window.location.href = orderData.checkout_url;
//       } else {
//         toast.success('Order placed successfully!');
//         navigate('/orders');
//       }
//     }

//     if (error) {
//       // Type assertion to handle the error
//       const err = error as any;
//       toast.error(err?.data?.message || 'Failed to place order');
//     }
//   }, [isSuccess, orderData, paymentMethod, navigate, error]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error('Please login to place an order');
//       navigate('/login');
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error('Requested quantity exceeds available stock');
//       return;
//     }

//     try {
//       const order = {
//         products: [
//           {
//             product: product._id,
//             quantity,
//           },
//         ],
//         shippingAddress: shippingAddress || user.address,
//         phoneNumber: phoneNumber || user.phone,
//         paymentMethod,
//         totalPrice: parseFloat(totalPrice),
//       };

//       console.log('Submitting order:', order); // Debug log

//       await createOrder(order).unwrap();
//     } catch (error) {
//       console.error('Order creation error:', error);
//       toast.error('Failed to place order');
//     }
//   };

//   if (!product) return <LoadingSpinner />;

//   return (
//     <div className="max-w-6xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Order Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//           <div className="flex items-center border-b pb-4 mb-4">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-20 h-20 object-contain mr-4"
//             />
//             <div>
//               <h3 className="font-medium">{product.name}</h3>
//               <p className="text-gray-600">
//                 ${product.price} x {quantity}
//               </p>
//               <p className="text-gray-600">Stock: {product.stock}</p>
//             </div>
//           </div>

//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between">
//               <span>Subtotal:</span>
//               <span>${totalPrice}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>$0.00</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total:</span>
//               <span>${totalPrice}</span>
//             </div>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Quantity</label>
//               <input
//                 type="number"
//                 min="1"
//                 max={product.stock}
//                 value={quantity}
//                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 Shipping Address
//               </label>
//               <textarea
//                 value={shippingAddress || user?.address || ''}
//                 onChange={(e) => setShippingAddress(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Phone Number</label>
//               <input
//                 type="tel"
//                 value={phoneNumber || user?.phone || ''}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">Payment Method</label>
//               <div className="space-y-2">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="shurjopay"
//                     checked={paymentMethod === 'shurjopay'}
//                     onChange={() => setPaymentMethod('shurjopay')}
//                     className="mr-2"
//                   />
//                   <span>ShurjoPay (Card/Bank/Mobile Banking)</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cashOnDelivery"
//                     checked={paymentMethod === 'cashOnDelivery'}
//                     onChange={() => setPaymentMethod('cashOnDelivery')}
//                     className="mr-2"
//                   />
//                   <span>Cash on Delivery</span>
//                 </label>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               {isLoading ? 'Processing...' : 'Place Order'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

//-------------------2

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '@/redux/api/orderApi';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';
import TUser from '@/pages/OrderManagment/Ordertyps';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  description?: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  const user = useAppSelector((state) => state.auth.user) as TUser;

  // Get product from location state
  const product = location.state?.product as Product;

  // Form state
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<
    'shurjopay' | 'cashOnDelivery'
  >('shurjopay');
  const [notes, setNotes] = useState('');

  // Calculate total price
  const totalPrice = product ? (product.price * quantity).toFixed(2) : '0.00';

  // Redirect if no product
  useEffect(() => {
    if (!product) {
      navigate('/products');
      toast.error('No product selected for checkout');
    }
  }, [product, navigate]);

  // Handle errors
  useEffect(() => {
    if (isError && error) {
      const err = error as any;
      toast.error(err?.data?.message || 'Failed to place order');
    }
  }, [isError, error]);

  // const handleSubmit = async (e: React.FormEvent) => {
  // e.preventDefault();

  // if (!user) {
  // toast.error('Please login to place an order');
  // navigate('/login', { state: { from: location } });
  // return;
  // }

  // if (quantity > product.stock) {
  // toast.error('Requested quantity exceeds available stock');
  // return;
  // }

  // try {
  // const orderData = {
  // products: [{
  // product: product._id,
  // quantity,
  // }],
  // shippingAddress,
  // phoneNumber,
  // paymentMethod,
  // totalPrice: parseFloat(totalPrice),
  // notes,
  // };

  // const response = await createOrder(orderData).unwrap();

  // if (paymentMethod === 'shurjopay' && response.data?.checkout_url) {
  // Redirect to ShurjoPay payment page
  // window.location.href = response.data.checkout_url;
  // } else {
  // For cash on delivery
  // toast.success('Order placed successfully!');
  // navigate('/orders');
  // }
  // } catch (err) {
  // console.error('Order creation error:', err);
  // toast.error('Failed to place order. Please try again.');
  // }
  // };

  // In your Checkout.tsx, modify the handleSubmit function:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (quantity > product.stock) {
      toast.error('Requested quantity exceeds available stock');
      return;
    }

    try {
      const orderData = {
        products: [
          {
            product: product._id,
            quantity,
          },
        ],
        shippingAddress,
        phoneNumber,
        paymentMethod,
        totalPrice: parseFloat(totalPrice),
        notes,
      };

      const response = await createOrder(orderData).unwrap();

      if (paymentMethod === 'shurjopay' && response.data?.checkout_url) {
        // Redirect to ShurjoPay payment page
        window.location.href = response.data.checkout_url;
      } else {
        // For cash on delivery
        toast.success('Order placed successfully!');
        navigate(`/orders/${response.data?.order?._id}`);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>

          <div className="flex items-center border-b pb-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-contain rounded mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">
                ${product.price.toFixed(2)} × {quantity}
              </p>
              <p className="text-gray-600">Stock: {product.stock}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800">${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-gray-800">$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span className="text-gray-800">Total:</span>
              <span className="text-blue-600">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Shipping & Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full p-2 dark:text-black  border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full dark:text-black  p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 dark:text-black  border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 dark:text-black  border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="Special instructions, delivery preferences, etc."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-700 mb-2">Payment Method</label>

              <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  id="shurjopay"
                  name="payment"
                  value="shurjopay"
                  checked={paymentMethod === 'shurjopay'}
                  onChange={() => setPaymentMethod('shurjopay')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="shurjopay" className="ml-3 block text-gray-700">
                  <span className="font-medium">ShurjoPay</span>
                  <p className="text-sm text-gray-500">
                    Pay with card, bank, or mobile banking
                  </p>
                </label>
              </div>

              <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="payment"
                  value="cashOnDelivery"
                  checked={paymentMethod === 'cashOnDelivery'}
                  onChange={() => setPaymentMethod('cashOnDelivery')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="ml-3 block text-gray-700"
                >
                  <span className="font-medium">Cash on Delivery</span>
                  <p className="text-sm text-gray-500">
                    Pay when you receive the product
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner />
                  Processing...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
