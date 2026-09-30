export interface Employee {
  id: number
  department_id: number
  department_name: string
  full_name: string
  salary: string | null
  age: number | null
  hire_date: string | null
}

export type EmployeePayload = Omit<Employee, 'id' | 'department_name'>
