/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';

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
        url: '/auth/profile', // Endpoint to fetch user info using token
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserInfoQuery } =
  authApi;
