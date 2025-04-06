import { useParams } from 'react-router-dom';

const UserOrder = () => {
  const { orderId } = useParams();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <p>
        Order ID: <strong>{orderId}</strong>
      </p>
      {/* Fetch and display order details based on orderId here */}
    </div>
  );
};

export default UserOrder;
