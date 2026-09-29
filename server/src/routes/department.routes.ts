import { Router } from 'express'
import * as departmentController from '../controllers/department.controller.js'

export const departmentRoutes = Router()

departmentRoutes.get('/', departmentController.getAll)
departmentRoutes.get('/:id', departmentController.getById)
departmentRoutes.post('/', departmentController.create)
departmentRoutes.put('/:id', departmentController.update)
departmentRoutes.delete('/:id', departmentController.remove)
