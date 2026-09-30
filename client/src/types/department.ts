export interface Department {
  id: number
  name: string
  budget: string | null
  floor: number | null
  created_at: string | null
}

export interface DepartmentPage {
  rows: Department[]
  total: number
}
