/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetUserOrdersQuery } from '@/redux/api/orderApi';
import { format } from 'date-fns';
import { Loader2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyOrders = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const { data, isLoading, error } = useGetUserOrdersQuery(userId || '');
  const orders = data?.data;

  return (
    <div className="max-w-4xl mt-10 mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Orders
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center text-gray-500">
          <Loader2 className="animate-spin w-6 h-6 mr-2" />
          Loading your orders...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-red-500 gap-2">
          <AlertCircle className="w-5 h-5" />
          Failed to fetch orders
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
              className="relative cursor-pointer bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="mb-2 text-sm text-gray-500">
                Order ID:{' '}
                <span className="font-medium">#{order._id.slice(-8)}</span>
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Status: <span className="text-indigo-600">{order.status}</span>
              </div>
              <div className="text-gray-600 mb-1">
                Total: <span className="font-medium">${order.totalPrice}</span>
              </div>
              <div className="text-gray-500 text-sm">
                Date: {format(new Date(order.createdAt), 'PPP')}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                Click for details
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          You haven’t placed any orders yet.
        </p>
      )}

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Order Details
              </h3>
              <p className="mb-2 dark:text-black ">
                <strong>Order ID:</strong> #{selectedOrder._id}
              </p>
              <p className="mb-2 dark:text-black ">
                <strong>Status:</strong>{' '}
                <span className="text-indigo-600">{selectedOrder.status}</span>
              </p>
              <p className="mb-2 dark:text-black ">
                <strong>Total Price:</strong> ${selectedOrder.totalPrice}
              </p>
              <p className="mb-2 dark:text-black ">
                <strong>Created At:</strong>{' '}
                {format(new Date(selectedOrder.createdAt), 'PPPpp')}
              </p>

              {selectedOrder.products && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 dark:text-black ">
                    Items:
                  </h4>
                  <ul className="list-disc dark:text-black  list-inside text-sm text-gray-600">
                    {selectedOrder.products.map((item: any, index: number) => (
                      <li key={index}>
                        {item?.product?.title || 'Untitled'} × {item?.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
