/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/api/orderApi';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  Divider,
  Chip,
  Skeleton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { format } from 'date-fns';

// Match these exactly with your API's expected status values
type ApiOrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderFormData {
  status: ApiOrderStatus;
}

interface UpdateOrderStatusRequest {
  status: ApiOrderStatus;
}

const statusColorMap: Record<
  ApiOrderStatus,
  'info' | 'primary' | 'success' | 'error'
> = {
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
};

const OrderEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderData, isLoading, refetch } = useGetOrderByIdQuery(id!);

  const [updateOrder] = useUpdateOrderStatusMutation();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<OrderFormData>();

  const order = orderData?.data;

  useEffect(() => {
    if (order) {
      // Convert status to match our ApiOrderStatus type
      const validStatuses: ApiOrderStatus[] = [
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ];
      const formattedStatus = validStatuses.includes(
        order.status as ApiOrderStatus,
      )
        ? (order.status as ApiOrderStatus)
        : 'Processing';
      reset({ status: formattedStatus });
    }
  }, [order, reset]);

  const onSubmit = async (formData: OrderFormData) => {
    try {
      const updateData: UpdateOrderStatusRequest = {
        status: formData.status,
      };

      console.log('Submitting status update:', updateData);

      const response = await updateOrder({
        id: id!,
        data: updateData,
      }).unwrap();

      console.log('Update response:', response);

      if (response?.status === true || response?.success === true) {
        toast.success(response.message || 'Order status updated successfully');
        await refetch();

        setTimeout(() => navigate('/dashboard/orderList'), 1000);
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          'Failed to update order status',
      );
    }
  };

  if (isLoading) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Loading Order...
        </Typography>
        <Card sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={56} width="30%" />
        </Card>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Order Not Found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/admin/orders')}
          sx={{ mt: 2 }}
        >
          Back to Orders
        </Button>
      </Box>
    );
  }

  return (
    <Box mt={7} p={4} maxWidth="md" mx="auto">
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Edit Order #{order._id.slice(-8).toUpperCase()}
      </Typography>

      <Card sx={{ p: 4, mb: 4 }}>
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>
              <strong>Customer:</strong> {order.user.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {order.user.email}
            </Typography>
            <Typography>
              <strong>Date:</strong> {format(new Date(order.createdAt), 'PPpp')}
            </Typography>
            <Typography>
              <strong>Total:</strong> ${order.totalPrice?.toFixed(2)}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <strong>Current Status:</strong>
              <Chip
                label={order.status}
                color={
                  statusColorMap[order.status as ApiOrderStatus] || 'default'
                }
                size="small"
              />
            </Box>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Update Status
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>New Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="New Status" required>
                  {Object.entries(statusColorMap).map(([status, color]) => (
                    <MenuItem key={status} value={status}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={status}
                          color={color}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box display="flex" gap={2} mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Update Status
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/orders')}
              size="large"
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default OrderEdit;
