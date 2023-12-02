import type UserType from '../types/user.type'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<UserType> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return data
}

export const userLogin = async (
  payload: UserType
): Promise<UserType | null> => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })
  return data
}
