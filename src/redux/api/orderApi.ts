/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from '../api/baseApi';

// Types
interface ProductItem {
  product: string;
  quantity: number;
}

interface Order {
  shurjopayOrderId: string;
  _id: string;

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: {
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  shippingAddress: string;
  phoneNumber: string;
  paymentMethod: 'shurjopay' | 'cashOnDelivery';
  totalPrice: number;
  status:
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled'
    | 'Failed';
  transaction?: {
    id: string;
    transactionStatus: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderRequest {
  products: ProductItem[];
  shippingAddress: string;
  phoneNumber: string;
  paymentMethod: 'shurjopay' | 'cashOnDelivery';
  totalPrice: number;
}

interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: {
    order?: Order;
    checkout_url?: string;
  };
}

interface GetOrdersResponse {
  success: boolean;
  data: Order[];
}

interface UpdateOrderStatusRequest {
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface VerifyPaymentRequest {
  orderId: string;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new order
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    // Get all orders (for admin)
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),

    // Get orders for current user

    getUserOrders: builder.query<GetOrdersResponse, string>({
      query: (id) => `/orders/${id}`, // id = userId
      providesTags: ['Order'],
    }),

    // Get order by ID
    getOrderById: builder.query<{ success: boolean; data: Order }, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    // Update order status
    // updateOrderStatus: builder.mutation<
    // Order,
    // { id: string; data: UpdateOrderStatusRequest }
    // >({
    // query: ({ id, data }) => ({
    // url: `/orders/${id}`,
    // method: 'PATCH',
    // body: data,
    // }),
    // invalidatesTags: (result, error, { id }) => [
    // { type: 'Order', id },
    // 'Order',
    // ],
    // }),

    // In your orderApi.ts
    updateOrderStatus: builder.mutation<
      {
        success: boolean;
        status: boolean;
        message: string;
        result: any;
      },
      { id: string; data: UpdateOrderStatusRequest }
    >({
      query: ({ id, data }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // Verify payment
    // verifyPayment: builder.mutation<
    // { success: boolean; data: Order },
    // VerifyPaymentRequest
    // >({
    // query: (body) => ({
    // url: '/orders/verify-payment',
    // method: 'POST',
    // body,
    // }),
    // invalidatesTags: ['Order'],
    // }),

    verifyPayment: builder.mutation<
      {
        success: boolean;
        data: Order;
      },
      { orderId: string }
    >({
      query: (body) => ({
        url: '/orders/verify-payment',
        method: 'POST',
        body,
      }),
    }),

    // In your orderApi.ts
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
    }),

    // Cancel order
    cancelOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useVerifyPaymentMutation,
  useDeleteOrderMutation,
  useCancelOrderMutation,
} = orderApi;

export default orderApi;
