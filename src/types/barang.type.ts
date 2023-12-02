import { Decimal } from '@prisma/client/runtime/library'

export default interface BarangType {
  id: number
  nama: string
  jumlah: number
  harga: Decimal
  created_at?: Date
  updated_at?: Date
}
