import { type NextFunction, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'

export const getAllBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const data = [
      {
        id: 1,
        nama: 'Barang 1',
        jumlah: 10,
        harga: 10000
      },
      {
        id: 2,
        nama: 'Barang 2',
        jumlah: 20,
        harga: 20000
      },
      {
        id: 3,
        nama: 'Barang 3',
        jumlah: 30,
        harga: 30000
      }
    ]
    return res.status(200).json({
      error: null,
      message: 'Pengambilan semua data berhasil',
      data
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts : ' +
          error.message
      )
    )
  }
}

export const insertBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const { error, value } = inputBarangValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }

    return res.status(200).json({
      error: null,
      message: 'Input data sukses',
      data: value
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts : ' +
          error.message
      )
    )
  }
}
