/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';
import { UserD } from '@/pages/UserManagment/types';
import { ReactNode } from 'react';

export interface User {
  role: ReactNode;
  id: string;
  name: string;
  email: string;
  status:boolean
}

export interface ApiResponse {
  status: boolean;
  message: string;

  result: UserD; // Assuming 'result' is the actual user object
}

export interface User {
  name: string;
  email: string;
   _id: string;
   phone:string;
   address:string;
   city:string;
   isBlocked:boolean;
   createdAt:string;
   updatedAt:string
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
} = authApi;
