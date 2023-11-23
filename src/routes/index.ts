import { Router } from 'express'
import barangRouter from './barang.route'

const app = Router()

// http://localhost:3000/api/barang
app.use('/api', barangRouter)
export default app
