import { type Request, type Response, Router } from 'express'
const barangRouter = Router()

barangRouter.get('/barang', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' })
})

export default barangRouter
