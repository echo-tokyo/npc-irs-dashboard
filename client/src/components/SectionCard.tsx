import type { ReactNode } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { gradients, shadows } from '@/assets/theme'

interface SectionCardProps {
  title: string
  children: ReactNode
}

const styles = {
  header: {
    mx: 2,
    mt: -3,
    py: 3,
    px: 2,
    borderRadius: '8px',
    backgroundImage: gradients.info,
    boxShadow: shadows.info,
  },
  content: { mt: 3, overflow: 'hidden', borderRadius: '0 0 12px 12px' },
}

export const SectionCard = ({ title, children }: SectionCardProps) => (
  <Card>
    <Box sx={styles.header}>
      <Typography variant='h6'>{title}</Typography>
    </Box>
    <Box sx={styles.content}>{children}</Box>
  </Card>
)
