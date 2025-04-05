/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */


// // export default OrderList;


// import React, { useState } from 'react';
// import { useGetOrdersQuery } from '@/redux/api/orderApi';
// import { useNavigate } from 'react-router-dom';
// import { Button, Skeleton } from '@mui/material';
// import { format } from 'date-fns';
// import { FaEdit } from 'react-icons/fa';

// interface Order {
//   _id: string;
//   user: { 
//     name: string;
//     email: string;
//   };
//   status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Failed';
//   totalPrice?: number;
//   createdAt: string;
//   [key: string]: any;
// }

// const statusColors = {
//   Delivered: 'bg-green-100 text-green-800',
//   Pending: 'bg-yellow-100 text-yellow-800',
//   Processing: 'bg-blue-100 text-blue-800',
//   Shipped: 'bg-purple-100 text-purple-800',
//   Cancelled: 'bg-red-100 text-red-800',
//   Failed: 'bg-gray-100 text-gray-800'
// };

// const OrderList = () => {
//   const { data, isLoading } = useGetOrdersQuery();
//   const navigate = useNavigate();
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-4">
//         <Skeleton variant="rectangular" height={56} />
//         {[...Array(5)].map((_, i) => (
//           <Skeleton key={i} variant="rectangular" height={72} className="mt-2" />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 lg:p-12 mt-10">
//                 <h1 className="text-2xl font-bold text-center text-gray-800">Order Management</h1>
//       <div className="flex justify-between items-center mb-6">
// <h1></h1>
//         <div className="flex space-x-2 ">
//           <Button 
//             variant="contained" 
//             sx={{ backgroundColor: '#1f2937', color: '#fff' }}
//             onClick={() => navigate('/allbooks')}
//           >
//             New Order
//           </Button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="grid grid-cols-12 bg-gray-50 p-6 text-sm font-medium text-gray-500">
//           <div className="col-span-2 md:col-span-3">Order ID</div>
         
//           <div className="col-span-2">Status</div>
//           <div className="col-span-2 hidden md:block">Date</div>
//           <div className="col-span-2">Total</div>
//           <div className="col-span-2 mr-10 text-right">Actions</div>
//         </div>

//         {data?.data?.length ? (
//           data.data.map((order: Order) => (
//             <div 
//               key={order._id} 
//               className="grid grid-cols-12 items-center p-4 border-t hover:bg-gray-50 transition-colors"
//             >
//               <div className="col-span-2 md:col-span-3 text-sm font-medium text-gray-900 truncate">
//                 #{order._id.slice(-15)}
//               </div>
             
             
             
//               <div className="col-span-2">
//                 <span className={`px-2 py-1 text-xs bg-green-300 font-semibold rounded-full ${statusColors[order.status]}`}>
//                   {order.status}
//                 </span>
//               </div>
//               <div className="col-span-2 hidden md:block text-sm text-gray-500">
//                 {format(new Date(order.createdAt), 'MMM dd, yyyy')}
//               </div>
//               <div className="col-span-2 text-sm font-medium">
//                 ${order.totalPrice?.toFixed(2) || '0.00'}
//               </div>
//               <div className="col-span-2 gap-2 flex  ml-12 space-x-2">
//                 <Button
//                   size="small"
//                    sx={{ backgroundColor: '#374151', color: '#fff' }}
//                   variant="outlined"
//                   onClick={() => navigate(`dashboard/orders/${order._id}`)}
//                 >
//                   View
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="contained"
//                    sx={{ backgroundColor: '#374151', color: '#fff' }}
//                   onClick={() => navigate(`/dashboard/orders/edit/${order._id}`)}
//                 >
//                   <FaEdit/>
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             No orders found
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         <Button
//           variant="outlined"
//           disabled={paginationModel.page === 0}
//           onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page - 1 }))}
//         >
//           Previous
//         </Button>
//         <span className="text-sm text-gray-600">
//           Page {paginationModel.page + 1}
//         </span>
//         <Button
//           variant="outlined"
//           onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page + 1 }))}
//           disabled={data?.data && data.data.length < paginationModel.pageSize}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OrderList;


import React, { useState } from 'react';
import { useGetOrdersQuery, useDeleteOrderMutation } from '@/redux/api/orderApi';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Skeleton } from '@mui/material';
import { format } from 'date-fns';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Order {
  _id: string;
  user: { 
    name: string;
    email: string;
  };
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Failed';
  totalPrice?: number;
  createdAt: string;
  [key: string]: any;
}

const statusColors = {
  Delivered: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Cancelled: 'bg-red-100 text-red-800',
  Failed: 'bg-gray-100 text-gray-800'
};

const OrderList = () => {
  const { data, isLoading, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id).unwrap();
        toast.success('Order deleted successfully');
        refetch(); // Refresh the order list after deletion
      } catch (error) {
        toast.error('Failed to delete order');
        console.error('Delete error:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton variant="rectangular" height={56} />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={72} className="mt-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-12 mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800">Order Management</h1>
      <div className="flex justify-between items-center mb-6">
        <h1></h1>
        <div className="flex space-x-2">
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#1f2937', color: '#fff' }}
            onClick={() => navigate('/allbooks')}
          >
            New Order
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-6 text-sm font-medium text-gray-500">
          <div className="col-span-2 md:col-span-3">Order ID</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 hidden md:block">Date</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-2 mr-10 text-right">Actions</div>
        </div>

        {data?.data?.length ? (
          data.data.map((order: Order) => (
            <div 
              key={order._id} 
              className="grid grid-cols-12 items-center p-4 border-t hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-2 md:col-span-3 text-sm font-medium text-gray-900 truncate">
                #{order._id.slice(-15)}
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs bg-green-300 font-semibold rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="col-span-2 hidden md:block text-sm text-gray-500">
                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
              </div>
              <div className="col-span-2 text-sm font-medium">
                ${order.totalPrice?.toFixed(2) || '0.00'}
              </div>
              <div className="col-span-2 gap-2 flex ml-12 space-x-2">
               
               
               
               <IconButton
  size="small"
  sx={{
    backgroundColor: '#374151',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4b5563', // Darker shade on hover
    },
  }}
  onClick={() => navigate(`/dashboard/orders/${order._id}`)}
>
  <FaEye /> {/* Replace with your choice of icon */}
</IconButton>
               
               
               
               
               
               
               
               
               <IconButton
  size="small"
  sx={{
    backgroundColor: '#374151',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4b5563', // darken the hover effect
    },
  }}
  onClick={() => navigate(`/dashboard/orders/edit/${order._id}`)}
>
  <FaEdit />
</IconButton>
               
               
               
               
               
               <IconButton
  size="small"
  onClick={() => handleDelete(order._id)}
  sx={{
    color: '#ef4444',
  }}
>
  <FaTrash />
</IconButton>
               
               
               
               
               
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No orders found
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outlined"
          disabled={paginationModel.page === 0}
          onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page - 1 }))}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {paginationModel.page + 1}
        </span>
        <Button
          variant="outlined"
          onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page + 1 }))}
          disabled={data?.data && data.data.length < paginationModel.pageSize}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderList;

