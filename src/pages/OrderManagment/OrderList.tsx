import { useState } from 'react';
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from '@/redux/api/orderApi';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaEdit, FaEye, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@mui/material';

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  status:
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled'
    | 'Failed';
  totalPrice?: number;
  createdAt: string;
  [key: string]: any;
}

const statusColors = {
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
  Failed: 'bg-gray-100 text-gray-800 border-gray-200',
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(id).unwrap();
          toast.success('Order deleted successfully');
          refetch();
        } catch (error) {
          toast.error('Failed to delete order');
          console.error('Delete error:', error);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Order Management
        </h1>
        <Button
          onClick={() => navigate('/allbooks')}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <FaPlus />
          New Order
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {data?.data?.length ? (
                data.data.map((order: Order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.user?.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={`text-xs border ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${order.totalPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/dashboard/orders/${order._id}`)}
                        >
                          <FaEye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/dashboard/orders/edit/${order._id}`)}
                        >
                          <FaEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDelete(order._id)}
                        >
                          <FaTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium">
            {paginationModel.page * paginationModel.pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (paginationModel.page + 1) * paginationModel.pageSize,
              data?.data?.length || 0
            )}
          </span>{' '}
          of{' '}
          <span className="font-medium">{data?.data?.length || 0}</span> orders
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            disabled={paginationModel.page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setPaginationModel((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={
              data?.data &&
              data.data.length < paginationModel.pageSize
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;