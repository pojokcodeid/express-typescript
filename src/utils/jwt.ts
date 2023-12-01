import 'dotenv/config'
import jsonWebToken from 'jsonwebtoken'

const generateAccessToken = (user: any): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_SECRET), {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null
        ? String(process.env.JWT_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: any): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SCREET), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

export { generateAccessToken, generateRefreshToken }
