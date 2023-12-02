import type BarangType from '../types/barang.type'
import prisma from '../utils/client'

export const getBarang = async (): Promise<BarangType[] | null> => {
  const data = await prisma.barang.findMany()
  return data
}

export const getBarangById = async (id: number): Promise<BarangType | null> => {
  const data = await prisma.barang.findUnique({ where: { id } })
  return data
}

export const insertBarang = async (
  payload: BarangType
): Promise<BarangType> => {
  const data = await prisma.barang.create({ data: payload })
  return data
}

export const updateBarang = async (
  payload: BarangType
): Promise<BarangType> => {
  const data = await prisma.barang.update({
    where: { id: payload.id },
    data: { ...payload }
  })
  return data
}

export const deleteBarang = async (id: number): Promise<BarangType> => {
  const data = await prisma.barang.delete({ where: { id } })
  return data
}
