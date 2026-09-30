import { Stack } from '@mui/material'
import { DepartmentsGrid } from './components/DepartmentsGrid'
import { EmployeesSection } from './components/employees/EmployeesSection'
import { SectionCard } from '@/components/SectionCard'

export const TablesPage = () => (
  <Stack spacing={6} sx={{ pt: 3 }}>
    <SectionCard title='Отделы'>
      <DepartmentsGrid />
    </SectionCard>
    <EmployeesSection />
  </Stack>
)
