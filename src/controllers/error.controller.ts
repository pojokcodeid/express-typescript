import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/winston'

export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: 'Halaman tidak ditemukan',
    message: 'Halaman tidak ditemukan',
    data: null
  })
}
