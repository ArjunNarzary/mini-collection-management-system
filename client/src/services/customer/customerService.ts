import {
  ICustomerPayload,
  ICustomerResponse,
  IDefaultResponse,
} from "@/interfaces"
import { API_ENDPOINTS } from "../apiEndpoints"
import { apiSlice } from "../apiSlice"

const customerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query<ICustomerResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.customer.addCustomer,
        method: "GET",
      }),
      providesTags: ["customers"],
    }),

    addCustomer: builder.mutation<IDefaultResponse, ICustomerPayload>({
      query: (payload: ICustomerPayload) => ({
        url: API_ENDPOINTS.customer.addCustomer,
        method: "POST",
        body: { ...payload },
      }),
      invalidatesTags: ["customers"],
    }),
  }),
})

export const { useGetAllCustomersQuery, useAddCustomerMutation } =
  customerService
