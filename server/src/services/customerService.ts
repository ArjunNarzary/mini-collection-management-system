import esClient from "../config/elasticsearch"
import { ICustomer } from "../interfaces"

export const getAllCustomers = async () => {
  return esClient.search({
    index: "customers",
    query: {
      match_all: {},
    },
  })
}
export const createCustomer = async (customer: ICustomer) => {
  return esClient.index({
    index: "customers",
    document: customer,
    refresh: true,
  })
}

export const updateCustomer = async (customer: ICustomer, id: string) => {
  return esClient.update({
    index: "customers",
    id: id,
    doc: customer,
  })
}

export const findCustomersByAgent = async (agentId: string) => {
  return esClient.search({
    index: "customers",
    query: {
      match: {
        "agent._id": agentId,
      },
    },
  })
}

export const findCustomerById = async (id: string) => {
  return esClient.search({
    index: "customers",
    query: {
      terms: {
        _id: [id],
      },
    },
  })
}
export const deleteCustomerById = async (id: string) => {
  return esClient.deleteByQuery({
    index: "customers",
    query: {
      terms: {
        _id: [id],
      },
    },
  })
}
