import bcrypt from 'bcrypt'
const saltRounds = 10

const encript = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds)
}

const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export { encript, compare }
