import { useState } from 'react'
import type { ModelUpdatedEvent } from 'ag-grid-community'
import { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
import { Box, Typography } from '@mui/material'
import { gridTheme } from '@/assets/gridTheme'

const GRID_HEIGHT = 400

const styles = {
  grid: { height: GRID_HEIGHT },
  footer: {
    px: 2,
    py: 1.5,
    borderTop: 1,
    borderColor: 'divider',
    textAlign: 'right',
  },
}

export const DataGrid = <T,>(props: AgGridReactProps<T>) => {
  const [rowCount, setRowCount] = useState(0)

  const handleModelUpdated = ({ api }: ModelUpdatedEvent<T>) => {
    setRowCount(api.getDisplayedRowCount())
  }

  return (
    <>
      <Box sx={styles.grid}>
        <AgGridReact<T>
          theme={gridTheme}
          alwaysShowVerticalScroll
          {...props}
          onModelUpdated={handleModelUpdated}
        />
      </Box>
      <Box sx={styles.footer}>
        <Typography variant='body2' color='text.secondary'>
          Строк: {rowCount}
        </Typography>
      </Box>
    </>
  )
}
