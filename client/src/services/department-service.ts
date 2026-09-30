import type { DepartmentPage } from '@/types/department'
import { api } from './api'

interface Pagination {
  limit: number
  offset: number
}

export const getDepartments = async (pagination?: Pagination) => {
  const { data } = await api.get<DepartmentPage>('/departments', {
    params: pagination,
  })

  return data
}
