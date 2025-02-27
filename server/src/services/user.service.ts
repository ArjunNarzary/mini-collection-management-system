import prismaClient from "../config/prisma"

export const insertUserData = async (data: any) => {
  return prismaClient.user.create({ data })
}

export const findUserById = async (id: string) => {
  return prismaClient.user.findFirst({ where: { id } })
}

export const findUserByEmail = async (email: string) => {
  return prismaClient.user.findFirst({ where: { email } })
}
