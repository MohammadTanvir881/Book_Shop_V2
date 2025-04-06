/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/admin/Orders.tsx

import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '@/redux/api/orderApi';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';

import TOrder from './OrderTypes';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';

const OrdersPage = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateOrder({ id, status }).unwrap();
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success('Order deleted');
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: '_id',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className="font-medium">#{row.original._id.slice(-6)}</div>
      ),
    },
    {
      accessorKey: 'user',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <div>{row.original.user.name}</div>
          <div className="text-sm text-gray-500">{row.original.user.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'products',
      header: 'Products',
      cell: ({ row }) => (
        <div>
          {row.original.products.map((item) => (
            <div key={item.product._id} className="flex items-center space-x-2">
              <img
                src={item.product.image || '/placeholder-product.jpg'}
                alt={item.product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <div>{item.product.name}</div>
                <div className="text-sm text-gray-500">
                  {item.quantity} x ${item.product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total',
      cell: ({ row }) => `$${row.original.totalPrice.toFixed(2)}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full px-2 py-1 text-left">
                  Update Status
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[
                    'pending',
                    'processing',
                    'shipped',
                    'delivered',
                    'cancelled',
                  ].map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleStatusUpdate(order._id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(order._id)}
              >
                Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <DataTable columns={columns} data={data?.orders || []} />
    </div>
  );
};

export default OrdersPage;
