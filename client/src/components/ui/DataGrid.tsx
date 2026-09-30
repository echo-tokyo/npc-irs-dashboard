import { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
import { Box } from '@mui/material'
import { gridTheme } from '@/assets/gridTheme'

const GRID_HEIGHT = 400

export const DataGrid = <T,>(props: AgGridReactProps<T>) => (
  <Box sx={{ height: GRID_HEIGHT }}>
    <AgGridReact<T> theme={gridTheme} alwaysShowVerticalScroll {...props} />
  </Box>
)
