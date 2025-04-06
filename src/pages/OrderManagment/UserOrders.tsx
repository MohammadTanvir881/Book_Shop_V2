import React from 'react';
import { useGetUserOrdersQuery } from '@/redux/api/orderApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Skeleton,
  Typography,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
  Failed: 'default',
};

const UserOrders = () => {
  const { data, isLoading, isError } = useGetUserOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={60} sx={{ mb: 1 }} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        <Typography color="error">Error loading your orders</Typography>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="p-4 text-center">
        <Typography>You haven't placed any orders yet</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate('/products')}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((order) => (
              <TableRow key={order._id}>
                <TableCell>#{order._id.slice(-8)}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status] || 'default'}
                  />
                </TableCell>
                <TableCell>${order.totalPrice?.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserOrders;
