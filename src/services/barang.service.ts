import prisma from '../utils/client'

export const getBarang = async (): Promise<any> => {
  const data = await prisma.barang.findMany()
  return data
}
