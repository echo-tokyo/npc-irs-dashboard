import type { ColDef } from 'ag-grid-community'
import type { Employee } from '@/types/employee'
import { formatDate, formatMoney } from '@/utils/format'
import { DataGrid } from '@/components/ui/DataGrid'

interface EmployeesGridProps {
  employees?: Employee[]
}

const columnDefs: ColDef<Employee>[] = [
  { field: 'id', headerName: 'ID', maxWidth: 90 },
  { field: 'full_name', headerName: 'ФИО', flex: 2 },
  { field: 'department_name', headerName: 'Отдел', flex: 1.5 },
  {
    field: 'salary',
    headerName: 'Зарплата',
    valueGetter: ({ data }) => (data?.salary ? Number(data.salary) : null),
    valueFormatter: ({ value }) => formatMoney(value),
  },
  { field: 'age', headerName: 'Возраст' },
  {
    field: 'hire_date',
    headerName: 'Дата найма',
    cellDataType: 'dateString',
    valueFormatter: ({ value }) => formatDate(value),
  },
]

const defaultColDef: ColDef = { flex: 1, filter: true }

export const EmployeesGrid = ({ employees }: EmployeesGridProps) => (
  <DataGrid<Employee>
    rowData={employees}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    getRowId={({ data }) => String(data.id)}
  />
)
