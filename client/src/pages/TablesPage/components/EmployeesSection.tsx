import { useEffect, useState } from 'react'
import { SectionCard } from '@/components/ui/SectionCard'
import { getEmployees } from '@/services/employee.service'
import type { Employee } from '@/types/employee'
import { EmployeesGrid } from './EmployeesGrid'

export const EmployeesSection = () => {
  const [employees, setEmployees] = useState<Employee[]>()

  const loadEmployees = () => {
    getEmployees()
      .then(setEmployees)
      .catch(() => setEmployees((current) => current ?? []))
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  return (
    <SectionCard title='Сотрудники'>
      <EmployeesGrid employees={employees} />
    </SectionCard>
  )
}
