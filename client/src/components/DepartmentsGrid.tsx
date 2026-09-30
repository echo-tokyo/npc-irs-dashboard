import type { ColDef, IDatasource } from 'ag-grid-community'
import type { Department } from '@/types/department'
import { AgGridReact } from 'ag-grid-react'
import { Box } from '@mui/material'
import { gridTheme } from '@/assets/gridTheme'
import { getDepartments } from '@/services/department.service'
import { formatDate, formatMoney } from '@/utils/format'

const PAGE_SIZE = 10

const columnDefs: ColDef<Department>[] = [
  { field: 'id', headerName: 'ID', maxWidth: 90 },
  { field: 'name', headerName: 'Название', flex: 2 },
  {
    field: 'budget',
    headerName: 'Бюджет',
    valueFormatter: ({ value }) => formatMoney(value),
  },
  { field: 'floor', headerName: 'Этаж' },
  {
    field: 'created_at',
    headerName: 'Дата создания',
    valueFormatter: ({ value }) => formatDate(value),
  },
]

const defaultColDef: ColDef = { flex: 1, sortable: false }

const datasource: IDatasource = {
  getRows: async ({ startRow, endRow, successCallback, failCallback }) => {
    try {
      const { rows, total } = await getDepartments({
        limit: endRow - startRow,
        offset: startRow,
      })
      successCallback(rows, total)
    } catch {
      failCallback()
    }
  },
}

export const DepartmentsGrid = () => (
  <Box sx={{ height: 400 }}>
    <AgGridReact<Department>
      theme={gridTheme}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowModelType='infinite'
      datasource={datasource}
      cacheBlockSize={PAGE_SIZE}
      alwaysShowVerticalScroll
    />
  </Box>
)
