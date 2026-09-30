import type { Employee, EmployeePayload } from '@/types/employee'

export interface EmployeeForm {
  department_id: string
  full_name: string
  salary: string
  age: string
  hire_date: string
}

export type EmployeeFormErrors = Partial<Record<keyof EmployeeForm, string>>

const MONEY_PATTERN = /^\d+(\.\d{1,2})?$/
const MAX_SALARY = 10_000_000
const MAX_NAME_LENGTH = 150
const MIN_AGE = 14
const MAX_AGE = 100

const normalizeMoney = (value: string) => value.trim().replace(',', '.')

export const toEmployeeForm = (employee: Employee | null): EmployeeForm => ({
  department_id: String(employee?.department_id ?? ''),
  full_name: employee?.full_name ?? '',
  salary: employee?.salary ?? '',
  age: String(employee?.age ?? ''),
  hire_date: employee?.hire_date ?? '',
})

export const validateEmployeeForm = (form: EmployeeForm) => {
  const errors: EmployeeFormErrors = {}
  const name = form.full_name.trim()
  const salary = normalizeMoney(form.salary)
  const age = Number(form.age)

  if (!form.department_id) {
    errors.department_id = 'Выберите отдел'
  }
  if (!name) {
    errors.full_name = 'Введите ФИО'
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.full_name = `Не длиннее ${MAX_NAME_LENGTH} символов`
  }
  if (salary && (!MONEY_PATTERN.test(salary) || Number(salary) > MAX_SALARY)) {
    errors.salary = `Число от 0 до ${MAX_SALARY.toLocaleString('ru-RU')}, не больше 2 знаков после запятой`
  }
  if (form.age && (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE)) {
    errors.age = `Целое число от ${MIN_AGE} до ${MAX_AGE}`
  }

  return errors
}

export const toEmployeePayload = (form: EmployeeForm): EmployeePayload => ({
  department_id: Number(form.department_id),
  full_name: form.full_name.trim(),
  salary: normalizeMoney(form.salary) || null,
  age: form.age ? Number(form.age) : null,
  hire_date: form.hire_date || null,
})
