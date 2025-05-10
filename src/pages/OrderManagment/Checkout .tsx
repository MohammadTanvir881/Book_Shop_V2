import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '@/redux/api/orderApi';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';
import TUser from '@/pages/OrderManagment/Ordertyps';
import { FaShoppingCart, FaMapMarkerAlt, FaPhone, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

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

  const product = location.state?.product as Product;
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<'shurjopay' | 'cashOnDelivery'>('shurjopay');
  const [notes, setNotes] = useState('');
  const totalPrice = product ? (product.price * quantity).toFixed(2) : '0.00';

  useEffect(() => {
    if (!product) {
      navigate('/products');
      toast.error('No product selected for checkout');
    }
  }, [product, navigate]);

  useEffect(() => {
    if (isError && error) {
      const err = error as any;
      toast.error(err?.data?.message || 'Failed to place order');
    }
  }, [isError, error]);

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
        products: [{ product: product._id, quantity }],
        shippingAddress,
        phoneNumber,
        paymentMethod,
        totalPrice: parseFloat(totalPrice),
        notes,
      };

      const response = await createOrder(orderData).unwrap();

      if (paymentMethod === 'shurjopay' && response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
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
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <div className="w-20 h-1 bg-green-500 mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaShoppingCart className="mr-2" />
              Order Summary
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center border-b border-gray-100 pb-4 mb-4">
              <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center p-2 mr-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  ${product.price.toFixed(2)} × {quantity}
                </p>
                <p className={`text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-green-500">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Shipping & Payment</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-green-500" />
                  Shipping Address
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FaPhone className="mr-2 text-green-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={2}
                  placeholder="Special instructions, delivery preferences, etc."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'shurjopay' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                  onClick={() => setPaymentMethod('shurjopay')}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-5 w-5 mr-3">
                      <input
                        type="radio"
                        id="shurjopay"
                        name="payment"
                        checked={paymentMethod === 'shurjopay'}
                        onChange={() => {}}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <FaCreditCard className="text-green-500 mr-2" />
                      <div>
                        <label htmlFor="shurjopay" className="block text-gray-700 font-medium">
                          ShurjoPay
                        </label>
                        <p className="text-sm text-gray-500">
                          Pay with card, bank, or mobile banking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cashOnDelivery' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                  onClick={() => setPaymentMethod('cashOnDelivery')}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-5 w-5 mr-3">
                      <input
                        type="radio"
                        id="cashOnDelivery"
                        name="payment"
                        checked={paymentMethod === 'cashOnDelivery'}
                        onChange={() => {}}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-500 mr-2" />
                      <div>
                        <label htmlFor="cashOnDelivery" className="block text-gray-700 font-medium">
                          Cash on Delivery
                        </label>
                        <p className="text-sm text-gray-500">
                          Pay when you receive the product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
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
    </div>
  );
};

export default Checkout;