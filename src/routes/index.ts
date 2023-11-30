import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controllers/error.controller'
import userRouter from './user.router'

const app = Router()

// http://localhost:3000/api/barang
app.use('/api', barangRouter)
app.use('/api', userRouter)

app.use('*', errorHandling)
app.use('*', notFound)
export default app
