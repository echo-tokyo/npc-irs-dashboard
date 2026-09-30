import { useEffect, useState } from 'react'
import { SectionCard } from '@/components/SectionCard'
import { getEmployees } from '@/services/employee-service'
import type { Employee } from '@/types/employee'
import { EmployeesGrid } from './EmployeesGrid'
import { EmployeesToolbar } from './EmployeesToolbar'

export const EmployeesSection = () => {
  const [employees, setEmployees] = useState<Employee[]>()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selected = employees?.find(({ id }) => id === selectedId) ?? null

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
      <EmployeesToolbar selected={selected} onChange={loadEmployees} />
      <EmployeesGrid employees={employees} onSelect={setSelectedId} />
    </SectionCard>
  )
}
