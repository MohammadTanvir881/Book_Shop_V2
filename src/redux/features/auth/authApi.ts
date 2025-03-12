import { baseApi } from "@/redux/api/baseApi";


const authApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
      login : builder.mutation({
          query: (userInfo) => ({
              url: '/auth/login',
              method: 'POST',
              body: userInfo,
          })
      }),
      register: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo,
            }),
        }),
         getUserInfo: builder.query({
      query: () => ({
        url: "/auth/profile", // Endpoint to fetch user info using token
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token in headers
        },
      }),
    }),
  }),
});
  

export const {useLoginMutation,  useRegisterMutation, useGetUserInfoQuery} = authApi;