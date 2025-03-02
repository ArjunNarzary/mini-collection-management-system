export const API_ENDPOINTS = {
  auth: {
    login: "/user/login",
    register: "/user/register",
    refreshToken: "/user/refresh-token",
    logout: "/user/logout",
  },
  customer: {
    addCustomer: "/customer",
    getCustomer: (id: string) => `/customer/${id}`,
    getAgentCustomers: `/customer/agent`,
  },
}
