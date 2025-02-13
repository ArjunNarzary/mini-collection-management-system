import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "./apiEndpoints"
import { ILoginResponse } from "@/interfaces"
import { logOut, setToken } from "./auth/authSlice"
import { RootState } from "@/store"

const BASE_URL = import.meta.env.VITE_API_HOST

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", //sent the HttpOnly secure cookie with the request
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithTokenRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Try to update the token
    const refreshResult = await baseQuery(
      { url: API_ENDPOINTS.auth.refreshToken, method: "GET" },
      api,
      extraOptions
    )

    if (refreshResult?.data) {
      const loginResponse = refreshResult?.data as ILoginResponse

      // Store the new token
      api.dispatch(setToken(loginResponse))

      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut()) //Logout the user on Refresh Token failure
      api.dispatch(apiSlice.util.resetApiState())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithTokenRefresh,
  tagTypes: ["customers"],
  endpoints: () => ({}),
})
