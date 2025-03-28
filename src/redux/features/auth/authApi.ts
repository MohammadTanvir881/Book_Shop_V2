/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';
import { UserD } from '@/pages/UserManagment/types';
import { ReactNode } from 'react';
import { Product } from '@/pages/ProductManagment/productTypes';

export interface User {
  role: ReactNode;
  id: string;
  name: string;
  email: string;
  status: boolean;
}

// Add a new interface for the query parameters
export interface GetProductsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  category?: string;
  author?: string;
}

export type GetProductsResponse = {
  total: number;
  result: Product[];
};

export interface ApiResponse {
  status: boolean;
  message: string;

  result: UserD; // Assuming 'result' is the actual user object
}

export interface User {
  name: string;
  email: string;
  _id: string;
  phone: string;
  address: string;
  city: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  // Add other user fields as needed
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
  };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    register: builder.mutation<RegisterResponse, any>({
      query: (userInfo) => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    }),
    getallUserInfo: builder.query<ApiResponse, void>({
      query: () => ({
        url: '/user/all',
        method: 'GET',
      }),
    }),
    deactivateUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}/deactivate`, // Endpoint to deactivate user
        method: 'PATCH',
      }),
    }),

    // getProducts: builder.query<GetProductsResponse, { page: number; limit: number;  }>({
    // query: ({ page = 1, limit = 10 }) => {
    // return {
    // url: '/products',
    // params: { page, limit }, // Pass pagination parameters
    // };
    // },
    // }),

    // Update the getProducts query in your authApi
    getProducts: builder.query<GetProductsResponse, GetProductsParams>({
      query: (params) => {
        const { page = 1, limit = 10, ...filters } = params;
        return {
          url: '/products',
          params: {
            page,
            limit,
            ...(filters.searchTerm && { searchTerm: filters.searchTerm }),
            ...(filters.minPrice && { minPrice: filters.minPrice }),
            ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
            ...(filters.category && { category: filters.category }),
            ...(filters.author && { author: filters.author }),
          },
        };
      },
      providesTags: ['Product'],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }], // ক্যাশ ইনভ্যালিড করে
    }),
    deleteProduct: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useGetallUserInfoQuery,
  useDeactivateUserMutation,

  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = authApi;
