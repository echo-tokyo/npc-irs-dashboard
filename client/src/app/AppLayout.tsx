import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { DashboardNavbar } from '@/components/DashboardNavbar'
import { SIDENAV_WIDTH, Sidenav } from '@/components/Sidenav'

export const AppLayout = () => (
  <>
    <Sidenav />
    <Box component='main' sx={{ ml: `${SIDENAV_WIDTH + 24}px`, p: 3 }}>
      <DashboardNavbar />
      <Outlet />
    </Box>
  </>
)
