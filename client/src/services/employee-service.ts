import type { Employee, EmployeePayload } from '@/types/employee'
import { api } from './api'

export const getEmployees = async () => {
  const { data } = await api.get<Employee[]>('/employees')
  return data
}

export const createEmployee = async (payload: EmployeePayload) => {
  await api.post('/employees', payload)
}

export const updateEmployee = async (id: number, payload: EmployeePayload) => {
  await api.put(`/employees/${id}`, payload)
}

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`)
}
