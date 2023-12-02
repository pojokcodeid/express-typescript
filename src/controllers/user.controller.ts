import { type NextFunction, type Request, type Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import { compare, encript } from '../utils/bcrypt'
import { createUser, userLogin } from '../services/user.service'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }
    // encript password
    value.password = encript(value.password)
    delete value.confirmPassword
    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'Input data sukses',
      data: user
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error od file src/controllers/user.controller.ts : registerUser - ' +
          error.message
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { error, value } = loginUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }
    const user = await userLogin(value)
    if (user === null) {
      return res.status(404).json({
        error: 'User tidak ditemukan',
        message: 'Login gagal',
        data: null
      })
    }
    if (!compare(value.password, user.password)) {
      return res.status(400).json({
        error: 'Password salah',
        message: 'Login gagal',
        data: null
      })
    }
    const usr = {
      id: user.id,
      email: user.email,
      nama: user.nama,
      role: user.role
    }
    const acessToken = generateAccessToken(usr)
    const refreshToken = generateRefreshToken(usr)
    return res.status(200).json({
      error: null,
      message: 'Login sukses',
      data: usr,
      acessToken,
      refreshToken
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error od file src/controllers/user.controller.ts : loginUser - ' +
          error.message
      )
    )
  }
}
