import { Router } from 'express'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.contoller'
import { autenticate } from '../controllers/error.controller'
const barangRouter = Router()

barangRouter.get('/barang', autenticate, getAllBarang)
barangRouter.get('/barang/:id', autenticate, getDataBarangById)
barangRouter.post('/barang', autenticate, insertDataBarang)
barangRouter.put('/barang/:id', autenticate, updateDataBarang)
barangRouter.delete('/barang/:id', autenticate, deleteDataBarang)

export default barangRouter
