import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller'
const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter
