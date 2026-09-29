import {
  DataTypes,
  Model,
  QueryTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize'
import { sequelize } from '../db/db.js'

export class Department extends Model<
  InferAttributes<Department>,
  InferCreationAttributes<Department>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare budget: string | null
  declare floor: number | null
  declare created_at: string | null

  static async findPage(limit: number | null, offset: number) {
    const [rows, [{ total }]] = await Promise.all([
      sequelize.query<InferAttributes<Department>>(
        `SELECT id, name, budget, floor, created_at
         FROM departments
         ORDER BY id
         LIMIT :limit OFFSET :offset`,
        { replacements: { limit, offset }, type: QueryTypes.SELECT },
      ),
      sequelize.query<{ total: number }>(
        'SELECT COUNT(*)::int AS total FROM departments',
        { type: QueryTypes.SELECT },
      ),
    ])

    return { rows, total }
  }
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    budget: DataTypes.DECIMAL(12, 2),
    floor: DataTypes.INTEGER,
    created_at: DataTypes.DATEONLY,
  },
  { sequelize, tableName: 'departments', timestamps: false },
)
