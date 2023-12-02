import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/winston'
import { verifyAcessToken } from '../utils/jwt'

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response
): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Halaman tidak ditemukan',
    message: 'Halaman tidak ditemukan',
    data: null
  })
}

export const autenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Verifikasi token gagal',
      data: null
    })
  }
  const user = verifyAcessToken(String(token))
  if (user === null) {
    return res.status(401).json({
      error: 'Token tidak valid',
      message: 'Verifikasi token gagal',
      data: null
    })
  }
  next()
}
