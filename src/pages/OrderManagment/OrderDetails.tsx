import { useParams, useLocation } from 'react-router-dom';
import { useGetOrderByIdQuery } from '@/redux/api/orderApi';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/utils/LoadingSpinner';
import { useEffect } from 'react';
import { MdOutlineWatchLater } from "react-icons/md";

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data, isLoading, isError } = useGetOrderByIdQuery(id!);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      // Show SweetAlert on successful payment
      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your payment has been processed successfully',
        icon: 'success',
        confirmButtonText: 'View Order',
        confirmButtonColor: '#3B82F6',
        timer: 20000,
        timerProgressBar: true,
        didOpen: () => {
          // Clear the state to prevent showing the message again
          window.history.replaceState({}, document.title);
        }
      });
    }
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto mt-20 py-8 px-4 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Error loading order details
        </h2>
      </div>
    );
  }

  const order = data?.data;

  return (
    <div className="max-w-4xl mx-auto mt-20 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Order #{order?.transaction?.id || order?._id}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-2xl font-bold mb-2">Shipping Information</h3>
            <p className="text-gray-700 "><span className='font-semibold'>Customar Name</span>:  {order?.user.name}</p>
            <p className="text-gray-700"><span className='font-semibold'>Address</span>:  {order?.shippingAddress}</p>
            <p className="text-gray-700 mt-2"><span className='font-semibold'>Contact</span>:  {order?.phoneNumber}</p>
            <p></p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-2xl font-bold mb-2">Payment Information</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Method:</span> {order?.paymentMethod}
            </p>
            <p className="text-gray-700">
            
            
            <span className="font-semibold">Status:</span> 
<span className={`ml-2 px-2 py-1 rounded text-xs ${
     (order?.status as string) === 'Paid' ? 'bg-green-400 text-green-800' :
   order?.status === 'Pending' || order?.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
   order?.status === 'Shipped' || order?.status === 'Delivered' ? 'bg-blue-100 text-blue-800' :
   order?.status === 'Cancelled' || order?.status === 'Failed' ? 'bg-red-100 text-red-800' :
   'bg-gray-100 text-gray-800' // Default case for undefined or other statuses
}`}>
  {order?.status}
</span>

            
            
            
            
            
            </p>
            {order?.transaction?.id && (
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Transaction ID:</span> {order.transaction.id}
              </p>
            )}
           
           <div className='flex gap-2 '>
             <p className='pt-1 font-bold text-xl '><MdOutlineWatchLater /></p>
  <p>{order?.transaction?.date_time}</p>
           </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Products</h3>
          <div className="space-y-4">
            {order?.products?.map((item) => (
              <div key={item.product._id} className="flex items-center p-3 border rounded hover:bg-gray-50">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <p className='font-bold'>Qty: {item.quantity}</p>
                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-lg font-bold">${order?.totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;