import 'dotenv/config'
import jsonWebToken, { JwtPayload } from 'jsonwebtoken'
import UserType from '../types/user.type'

const generateAccessToken = (user: UserType): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_SECRET), {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null
        ? String(process.env.JWT_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: UserType): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SCREET), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

const verifyRefreshToken = (token: string): string | null | JwtPayload => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SCREET))
  } catch (error) {
    return null
  }
}

const parseJWT = (token: string): UserType => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

const verifyAcessToken = (token: string): string | null | JwtPayload => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_SECRET))
  } catch (error) {
    return null
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJWT,
  verifyAcessToken
}
