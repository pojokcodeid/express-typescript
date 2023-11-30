import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { registerUser } from '../controllers/user.controller'
const userRouter = Router()

userRouter.post('/register', expressAsyncHandler(registerUser))

export default userRouter
