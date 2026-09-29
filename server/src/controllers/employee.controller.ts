import type { Request, Response } from 'express'
import { ForeignKeyConstraintError } from 'sequelize'
import { Employee } from '../models/employee.model.js'
import {
  parseId,
  readDate,
  readInteger,
  readMoney,
  readText,
} from '../utils/validation.js'

const parseEmployee = (body: Record<string, unknown> = {}) => ({
  department_id: parseId(body.department_id, 'department_id'),
  full_name: readText(body.full_name, 'full_name', { maxLength: 150 }),
  salary: readMoney(body.salary, 'salary', { max: 10_000_000 }),
  age: readInteger(body.age, 'age', { min: 14, max: 100 }),
  hire_date: readDate(body.hire_date, 'hire_date'),
})

export const getAll = async (_req: Request, res: Response) => {
  const employees = await Employee.findAllWithDepartment()

  res.json(employees)
}

export const getById = async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(parseId(req.params.id))

  if (!employee) {
    res.status(404).json({ message: 'Сотрудник не найден' })
    return
  }

  res.json(employee)
}

export const create = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.create(parseEmployee(req.body))

    res.status(201).json(employee)
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: 'Указанный отдел не существует' })
      return
    }
    throw error
  }
}

export const update = async (req: Request, res: Response) => {
  const id = parseId(req.params.id)
  const data = parseEmployee(req.body)

  try {
    const [updatedCount, [employee]] = await Employee.update(data, {
      where: { id },
      returning: true,
    })

    if (!updatedCount) {
      res.status(404).json({ message: 'Сотрудник не найден' })
      return
    }

    res.json(employee)
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: 'Указанный отдел не существует' })
      return
    }
    throw error
  }
}

export const remove = async (req: Request, res: Response) => {
  const deletedCount = await Employee.destroy({
    where: { id: parseId(req.params.id) },
  })

  if (!deletedCount) {
    res.status(404).json({ message: 'Сотрудник не найден' })
    return
  }

  res.status(204).end()
}
