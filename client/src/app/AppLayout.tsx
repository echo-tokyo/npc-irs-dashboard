import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { DashboardNavbar } from './layout/DashboardNavbar'
import { SIDENAV_WIDTH, Sidenav } from './layout/Sidenav'

const CONTENT_OFFSET = SIDENAV_WIDTH + 24

export const AppLayout = () => (
  <>
    <Sidenav />
    <Box component='main' sx={{ ml: `${CONTENT_OFFSET}px`, px: 3, py: 2 }}>
      <DashboardNavbar />
      <Outlet />
    </Box>
    <Toaster theme='dark' richColors position='bottom-right' />
  </>
)
