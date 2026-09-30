import DashboardIcon from '@mui/icons-material/SpaceDashboardRounded'
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
import { routes } from '../routes'
import { colors, gradients, shadows } from '@/assets/theme'

export const SIDENAV_WIDTH = 250

const styles = {
  paper: {
    width: SIDENAV_WIDTH,
    height: 'calc(100vh - 32px)',
    m: 2,
    border: 'none',
    borderRadius: '12px',
    bgcolor: colors.sidenav,
    boxShadow: shadows.xxl,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 4,
    pt: 3,
    pb: 1,
    color: 'common.white',
  },
  brandName: { fontWeight: 600, textTransform: 'none' },
  item: {
    mx: 2,
    my: '1.5px',
    px: '10px',
    py: 1,
    borderRadius: '6px',
    color: 'common.white',
    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
    '&.active': { backgroundImage: gradients.info },
    '&.active .MuiListItemText-primary': { fontWeight: 400 },
  },
  itemIcon: { minWidth: 32, color: 'inherit' },
  itemText: { ml: '10px', my: 0 },
  itemTextPrimary: { fontSize: '0.875rem', fontWeight: 300 },
}

export const Sidenav = () => (
  <Drawer variant='permanent' slotProps={{ paper: { sx: styles.paper } }}>
    <Box sx={styles.brand}>
      <DashboardIcon />
      <Typography variant='button' sx={styles.brandName}>
        NPC IRS Dashboard
      </Typography>
    </Box>
    <Divider />
    <List component='nav' disablePadding>
      {routes.map(({ path, title, icon }) => (
        <ListItemButton
          key={path}
          component={NavLink}
          to={path}
          end
          sx={styles.item}
        >
          <ListItemIcon sx={styles.itemIcon}>{icon}</ListItemIcon>
          <ListItemText
            primary={title}
            sx={styles.itemText}
            slotProps={{ primary: { sx: styles.itemTextPrimary } }}
          />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
)
