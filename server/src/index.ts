import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import { sequelize } from './db/db.js'
import { departmentRoutes } from './routes/department.routes.js'
import { ValidationError } from './utils/validation.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/departments', departmentRoutes)

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ValidationError) {
    res.status(400).json({ message: error.message })
    return
  }
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Некорректный JSON в теле запроса' })
    return
  }
  console.error(error)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

await sequelize.authenticate()

app.listen(port, (error) => {
  if (error) {
    throw error
  }
  console.log(`Сервер запущен на порту ${port}.`)
})
