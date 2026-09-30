import type {
  ColDef,
  GetRowIdParams,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community'
import type { Employee } from '@/types/employee'
import { formatDate, formatMoney, formatValue } from '@/utils/format'
import { DataGrid } from '@/components/DataGrid'

interface EmployeesGridProps {
  employees?: Employee[]
  onSelect: (id: number | null) => void
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

const defaultColDef: ColDef = {
  flex: 1,
  filter: true,
  valueFormatter: ({ value }) => formatValue(value),
}

const rowSelection: RowSelectionOptions = {
  mode: 'singleRow',
  checkboxes: false,
  enableClickSelection: true,
}

const getRowId = ({ data }: GetRowIdParams<Employee>) => String(data.id)

export const EmployeesGrid = ({ employees, onSelect }: EmployeesGridProps) => {
  const handleSelectionChanged = ({ api }: SelectionChangedEvent<Employee>) => {
    onSelect(api.getSelectedRows()[0]?.id ?? null)
  }

  return (
    <DataGrid<Employee>
      rowData={employees}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowSelection={rowSelection}
      getRowId={getRowId}
      onSelectionChanged={handleSelectionChanged}
    />
  )
}
