import { Router } from 'express'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.contoller'
import expressAsyncHandler from 'express-async-handler'
import { autenticate } from '../controllers/error.controller'
const barangRouter = Router()

barangRouter.get('/barang', autenticate, expressAsyncHandler(getAllBarang))
barangRouter.get(
  '/barang/:id',
  autenticate,
  expressAsyncHandler(getDataBarangById)
)
barangRouter.post('/barang', autenticate, expressAsyncHandler(insertDataBarang))
barangRouter.put(
  '/barang/:id',
  autenticate,
  expressAsyncHandler(updateDataBarang)
)
barangRouter.delete(
  '/barang/:id',
  autenticate,
  expressAsyncHandler(deleteDataBarang)
)

export default barangRouter
