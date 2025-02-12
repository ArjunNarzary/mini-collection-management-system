import esClient from "../config/elasticsearch"
import { IUser } from "../interfaces"

export const checkIfUserExist = async (email: string) => {
  return esClient.count({
    index: "users",
    body: {
      query: {
        bool: {
          should: [{ term: { email } }],
        },
      },
    },
  })
}

export const createUser = async (user: IUser) => {
  return esClient.index({
    index: "users",
    document: user,
    refresh: true,
  })
}

export const findUserByEmail = async (email: string) => {
  return esClient.search({
    index: "users",
    query: {
      match: {
        email,
      },
    },
  })
}

export const findUserById = async (id: string) => {
  return esClient.search({
    index: "users",
    query: {
      terms: {
        _id: [id],
      },
    },
  })
}
export const deleteUserById = async (id: string) => {
  return esClient.deleteByQuery({
    index: "users",
    query: {
      terms: {
        _id: [id],
      },
    },
  })
}
