import { Router } from 'express'
import { getAllBarang, insertBarang } from '../controllers/barang.contoller'
const barangRouter = Router()

barangRouter.get('/barang', getAllBarang)
barangRouter.post('/barang', insertBarang)

export default barangRouter
