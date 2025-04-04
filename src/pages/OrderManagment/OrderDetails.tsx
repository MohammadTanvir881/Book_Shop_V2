// src/pages/OrderDetails.tsx
import { useParams, useLocation } from 'react-router-dom';
import { useGetOrderByIdQuery } from '@/redux/api/orderApi';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data, isLoading, isError } = useGetOrderByIdQuery(id!);
console.log(data)
  if (location.state?.paymentSuccess) {
    toast.success('Payment successful!');
    // Clear the state to prevent showing the message again
    window.history.replaceState({}, document.title);
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading order</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order #{data?.data?._id}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Shipping Information</h3>
            <p>{data?.data?.shippingAddress}</p>
            <p>{data?.data?.phoneNumber}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Payment Information</h3>
            <p>Method: {data?.data?.paymentMethod}</p>
            <p>Status: {data?.data?.status}</p>
            {data?.data?.transaction?.id && (
              <p>Transaction ID: {data.data.transaction.id}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Products</h3>
          {data?.data?.products?.map((item) => (
            <div key={item.product._id} className="flex items-center mb-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-contain mr-4"
              />
              <div>
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-lg font-semibold">
            Total: ${data?.data?.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;