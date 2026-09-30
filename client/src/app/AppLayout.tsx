import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { DashboardNavbar } from '@/components/layout/DashboardNavbar'
import { SIDENAV_WIDTH, Sidenav } from '@/components/layout/Sidenav'

export const AppLayout = () => (
  <>
    <Sidenav />
    <Box component='main' sx={{ ml: `${SIDENAV_WIDTH + 24}px`, p: 3 }}>
      <DashboardNavbar />
      <Outlet />
    </Box>
    <Toaster theme='dark' richColors position='bottom-right' />
  </>
)
