import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'

const getRefreshToken = (): string => {
  const usr = {
    user_id: '6009ab6b-59de-4777-a57f-e3d2ec4fb229',
    email: 'pojok@gmail.com',
    nama: 'Pojok Code',
    password: 'xxxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }
  return generateRefreshToken(usr)
}

describe('user', () => {
  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'pojok@gmail.com',
      password: '12345'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login sukses')
  })

  it('user login email tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'pojokxx@gmail.com',
      password: '12345'
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Login gagal')
  })
  it('user login password tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'pojok@gmail.com',
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'pojok123@gmail.com'
      }
    })
  })

  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      email: 'pojok123@gmail.com',
      nama: 'Pojok Code',
      password: '12345',
      confirmPassword: '12345'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Input data sukses')
  })

  it('register user data tidak valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      name: 'Pojok Code',
      email: 'pojok2@gmail.com',
      password: '12345',
      confirmPassword: '123456'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Input data gagal')
  })

  it('Refresh token valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', `Bearer ${getRefreshToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Refresh token berhasil')
  })

  it('Refresh token tidak valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', `Bearer 1231312312313`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Refresh token gagal')
  })
})
