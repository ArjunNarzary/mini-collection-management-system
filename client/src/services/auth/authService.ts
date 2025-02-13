import { IDefaultResponse, ILoginPayload, ILoginResponse } from "@/interfaces"
import { API_ENDPOINTS } from "../apiEndpoints"
import { apiSlice } from "../apiSlice"

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (credentials: ILoginPayload) => ({
        url: API_ENDPOINTS.auth.login,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logoutUser: builder.mutation<IDefaultResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.auth.logout,
        method: "PUT",
      }),
    }),

    refreshToken: builder.query<IDefaultResponse, ILoginPayload>({
      query: () => ({
        url: API_ENDPOINTS.auth.refreshToken,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useLogoutUserMutation,
  useLoginUserMutation,
  useRefreshTokenQuery,
} = authService
