import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Breadcrumbs,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { Link, useLocation } from 'react-router'
import { routes } from '@/app/routes'
import { shadows } from '@/assets/theme'

const styles = {
  navbar: {
    top: 12,
    mb: 3,
    py: 1,
    borderRadius: '12px',
    bgcolor: 'transparent',
    transition: 'all 300ms ease-in-out',
  },
  glass: {
    bgcolor: 'rgba(26, 32, 53, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: shadows.navbar,
  },
  toolbar: { flexDirection: 'column', alignItems: 'flex-start', px: 2 },
  breadcrumbs: {
    '& .MuiBreadcrumbs-separator': { color: 'grey.600', fontSize: '0.875rem' },
  },
  homeIcon: { display: 'block', color: 'common.white', opacity: 0.5 },
  crumb: { color: 'common.white', fontWeight: 400, textTransform: 'none' },
}

export const DashboardNavbar = () => {
  const { pathname } = useLocation()
  const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 })
  const title = routes.find((route) => route.path === pathname)?.title

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={[styles.navbar, isScrolled && styles.glass]}
    >
      <Toolbar variant='dense' sx={styles.toolbar}>
        <Breadcrumbs sx={styles.breadcrumbs}>
          <Link to='/'>
            <HomeIcon fontSize='small' sx={styles.homeIcon} />
          </Link>
          <Typography variant='button' sx={styles.crumb}>
            {title}
          </Typography>
        </Breadcrumbs>
        <Typography variant='h6' noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
