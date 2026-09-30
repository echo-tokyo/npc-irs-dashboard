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

export const DashboardNavbar = () => {
  const { pathname } = useLocation()
  const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 })
  const title = routes.find((route) => route.path === pathname)?.title

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        top: 12,
        mb: 3,
        py: 1,
        borderRadius: '12px',
        bgcolor: isScrolled ? 'rgba(26, 32, 53, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'saturate(200%) blur(30px)' : 'none',
        boxShadow: isScrolled ? shadows.navbar : 'none',
        transition: 'all 300ms ease-in-out',
      }}
    >
      <Toolbar
        variant='dense'
        sx={{ flexDirection: 'column', alignItems: 'flex-start', px: 2 }}
      >
        <Breadcrumbs
          sx={{
            '& .MuiBreadcrumbs-separator': {
              color: 'grey.600',
              fontSize: '0.875rem',
            },
          }}
        >
          <Link to='/'>
            <HomeIcon
              fontSize='small'
              sx={{ display: 'block', color: 'common.white', opacity: 0.5 }}
            />
          </Link>
          <Typography
            variant='button'
            sx={{
              color: 'common.white',
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
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
