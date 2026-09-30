import type { Request, Response } from 'express'
import { ForeignKeyConstraintError } from 'sequelize'
import { Department } from '../models/department.model.js'
import {
  parseId,
  readInteger,
  readMoney,
  readText,
} from '../utils/validation.js'

const MAX_LIMIT = 100

const parseDepartment = (body: Record<string, unknown> = {}) => ({
  name: readText(body.name, 'name', { maxLength: 100 }),
  budget: readMoney(body.budget, 'budget', { max: 1_000_000_000 }),
  floor: readInteger(body.floor, 'floor', { min: -5, max: 100 }),
})

export const getAll = async (req: Request, res: Response) => {
  const limit = readInteger(req.query.limit, 'limit', {
    min: 1,
    max: MAX_LIMIT,
  })
  const offset = readInteger(req.query.offset, 'offset', { min: 0 }) ?? 0
  const response = await Department.findPage(limit, offset)

  res.json(response)
}

export const getById = async (req: Request, res: Response) => {
  const department = await Department.findByPk(parseId(req.params.id))

  if (!department) {
    res.status(404).json({ message: 'Отдел не найден' })
    return
  }

  res.json(department)
}

export const create = async (req: Request, res: Response) => {
  const department = await Department.create(parseDepartment(req.body))
  res.status(201).json(department)
}

export const update = async (req: Request, res: Response) => {
  const id = parseId(req.params.id)
  const data = parseDepartment(req.body)
  const [updatedCount, [department]] = await Department.update(data, {
    where: { id },
    returning: true,
  })

  if (!updatedCount) {
    res.status(404).json({ message: 'Отдел не найден' })
    return
  }

  res.json(department)
}

export const remove = async (req: Request, res: Response) => {
  const id = parseId(req.params.id)

  try {
    const deletedCount = await Department.destroy({ where: { id } })

    if (!deletedCount) {
      res.status(404).json({ message: 'Отдел не найден' })
      return
    }

    res.status(204).end()
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res
        .status(409)
        .json({ message: 'Нельзя удалить отдел, в котором есть сотрудники' })
      return
    }
    throw error
  }
}
