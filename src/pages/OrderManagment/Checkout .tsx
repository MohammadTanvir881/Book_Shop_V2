import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <p className="text-center text-red-500">
        No product selected for checkout.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-700">Price: ${product.price}</p>
          <p className="text-gray-500">{product.description}</p>
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        Confirm Purchase
      </button>
    </div>
  );
};

export default Checkout;
