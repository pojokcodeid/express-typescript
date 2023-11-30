import type UserType from '../types/user.type'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<any> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return data
}
