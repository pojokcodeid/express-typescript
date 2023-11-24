import { type Request, type Response, Router } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
const barangRouter = Router()

barangRouter.get('/barang', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' })
})

barangRouter.post('/barang', (req: Request, res: Response) => {
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
})

export default barangRouter
