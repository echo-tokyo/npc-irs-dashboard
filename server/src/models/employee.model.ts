import {
  DataTypes,
  Model,
  QueryTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize'
import { sequelize } from '../db/db.js'

type EmployeeWithDepartment = InferAttributes<Employee> & {
  department_name: string
}

export class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<number>
  declare department_id: number
  declare full_name: string
  declare salary: string | null
  declare age: number | null
  declare hire_date: string | null

  static findAllWithDepartment() {
    return sequelize.query<EmployeeWithDepartment>(
      `
      SELECT e.id, e.department_id, d.name AS department_name,
      e.full_name, e.salary, e.age, e.hire_date
      FROM employees e
      JOIN departments d ON d.id = e.department_id
      ORDER BY e.id`,
      { type: QueryTypes.SELECT },
    )
  }
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
    full_name: { type: DataTypes.STRING(150), allowNull: false },
    salary: DataTypes.DECIMAL(10, 2),
    age: DataTypes.INTEGER,
    hire_date: DataTypes.DATEONLY,
  },
  { sequelize, tableName: 'employees', timestamps: false },
)
