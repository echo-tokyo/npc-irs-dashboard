import { Router } from 'express'
import * as employeeController from '../controllers/employee.controller.js'

export const employeeRoutes = Router()

employeeRoutes.get('/', employeeController.getAll)
employeeRoutes.get('/:id', employeeController.getById)
employeeRoutes.post('/', employeeController.create)
employeeRoutes.put('/:id', employeeController.update)
employeeRoutes.delete('/:id', employeeController.remove)
