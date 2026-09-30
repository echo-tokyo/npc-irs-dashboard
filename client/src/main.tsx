import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { InfiniteRowModelModule, ModuleRegistry } from 'ag-grid-community'
import { RouterProvider } from 'react-router'
import { router } from '@/app/router'
import { theme } from '@/assets/theme'

ModuleRegistry.registerModules([InfiniteRowModelModule])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
