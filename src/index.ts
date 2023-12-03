import 'dotenv/config'
import web from './middleware/web'
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

web.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})
