import { createTheme } from '@mui/material/styles'

export const gradients = {
  info: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
  dark: 'linear-gradient(195deg, #323a54, #1a2035)',
}

export const shadows = {
  card: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  info: '0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 187, 212, 0.4)',
  xxl: '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
  navbar:
    'inset 0 0 1px 1px rgba(52, 71, 103, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)',
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1A73E8', light: '#49a3f1', dark: '#1662C4' },
    secondary: { main: '#7b809a' },
    success: { main: '#4CAF50' },
    warning: { main: '#fb8c00' },
    error: { main: '#F44335' },
    background: { default: '#1a2035', paper: '#202940' },
    text: { primary: '#ffffffcc', secondary: '#ffffff99' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700, color: '#ffffff' },
    h6: { fontWeight: 700, color: '#ffffff' },
    button: { fontSize: '0.875rem', fontWeight: 300 },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          height: 1,
          margin: '16px 0',
          border: 'none',
          opacity: 0.25,
          backgroundImage:
            'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: shadows.card,
          overflow: 'visible',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '9px 24px',
          fontSize: '0.75rem',
          fontWeight: 700,
          lineHeight: 1.4,
          variants: [
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                backgroundImage: gradients.info,
                '&:hover': { boxShadow: shadows.info },
              },
            },
          ],
        },
      },
    },
  },
})
