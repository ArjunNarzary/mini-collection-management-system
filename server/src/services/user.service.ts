import prismaClient from "../config/prisma"

export const insertUserData = async (data: any) => {
  return prismaClient.user.create({ data })
}
