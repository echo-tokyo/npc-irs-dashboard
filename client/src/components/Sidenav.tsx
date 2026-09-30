import DashboardIcon from '@mui/icons-material/Dashboard'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router'
import { routes } from '@/app/routes'
import { gradients, shadows } from '@/assets/theme'

export const SIDENAV_WIDTH = 250

export const Sidenav = () => (
  <Drawer
    variant='permanent'
    slotProps={{
      paper: {
        sx: {
          width: SIDENAV_WIDTH,
          height: 'calc(100vh - 32px)',
          m: 2,
          border: 'none',
          borderRadius: '12px',
          bgcolor: '#1f283e',
          boxShadow: shadows.xxl,
        },
      },
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 4,
        pt: 3,
        pb: 1,
      }}
    >
      <DashboardIcon sx={{ color: 'common.white' }} />
      <Typography
        variant='button'
        sx={{ color: 'common.white', fontWeight: 600, textTransform: 'none' }}
      >
        NPC IRS Dashboard
      </Typography>
    </Box>
    <Divider />
    <List disablePadding>
      {routes.map(({ path, title, icon }) => (
        <ListItemButton
          key={path}
          component={NavLink}
          to={path}
          end
          sx={{
            mx: 2,
            my: '1.5px',
            px: '10px',
            py: 1,
            borderRadius: '6px',
            color: 'common.white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            '&.active': { backgroundImage: gradients.info },
            '&.active .MuiListItemText-primary': { fontWeight: 400 },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={title}
            sx={{ ml: '10px', my: 0 }}
            slotProps={{
              primary: { sx: { fontSize: '0.875rem', fontWeight: 300 } },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
)
