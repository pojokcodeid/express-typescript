import { type NextFunction, type Request, type Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import { compare, encript } from '../utils/bcrypt'
import { createUser, userLogin } from '../services/user.service'
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken
} from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
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
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error od file src/controllers/user.controller.ts : registerUser - ' +
          String((error as Error).message)
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
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
    // const usr = {
    //   id: user.user_id,
    //   email: user.email,
    //   nama: user.nama,
    //   role: user.role
    // }
    user.password = 'xxxxxx'
    const acessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.status(200).json({
      error: null,
      message: 'Login sukses',
      data: user,
      acessToken,
      refreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error od file src/controllers/user.controller.ts : loginUser - ' +
          String((error as Error).message)
      )
    )
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (token === undefined) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Verifikasi token gagal',
        data: null
      })
    }
    const verify = verifyRefreshToken(token)
    if (verify === null) {
      return res.status(401).json({
        error: 'Token tidak valid',
        message: 'Refresh token gagal',
        data: null
      })
    }
    const data = parseJWT(token)
    const user = await userLogin(data)
    if (user === null) {
      return res.status(404).json({
        error: 'Token tidak valid',
        message: 'Refresh token gagal',
        data: null
      })
    }
    user.password = 'xxxxxx'
    const acessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.status(200).json({
      error: null,
      message: 'Refresh token berhasil',
      data: user,
      acessToken,
      refreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error od file src/controllers/user.controller.ts : refreshToken - ' +
          String((error as Error).message)
      )
    )
  }
}
