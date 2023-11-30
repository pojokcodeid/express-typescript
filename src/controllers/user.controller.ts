import { type NextFunction, type Request, type Response } from 'express'
import { inputUserValidation } from '../validations/user.validation'
import { encript } from '../utils/bcrypt'
import { createUser } from '../services/user.service'

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
