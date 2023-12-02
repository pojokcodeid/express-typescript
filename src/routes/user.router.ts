import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { loginUser, registerUser } from '../controllers/user.controller'
const userRouter = Router()

userRouter.post('/register', expressAsyncHandler(registerUser))
userRouter.post('/login', expressAsyncHandler(loginUser))

export default userRouter
