
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyPaymentMutation } from '@/redux/api/orderApi';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get('order_id');

      if (!orderId) {
        toast.error('Invalid payment response');
        navigate('/');
        return;
      }

      try {
        const result = await verifyPayment({ orderId }).unwrap();

        if (result.success) {
          toast.success('Payment verified successfully!');
          navigate(`/orders/${orderId}`, { state: { paymentSuccess: true } });
        } else {
          toast.error('Payment verification failed');
          navigate(`/orders/${orderId}`);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Error verifying payment');
        navigate('/');
      }
    };

    verifyPaymentStatus();
  }, [location, navigate, verifyPayment]);

  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
      <p className="ml-4">Verifying your payment...</p>
    </div>
  );
};

export default PaymentSuccess;
