import Typography from '@mui/material/Typography'
import * as React from 'react'

interface TitleProps {
  children?: React.ReactNode
  color?: string
}

export default function Title({ color = 'primary', children }: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color={color} gutterBottom mb={3}>
      {children}
    </Typography>
  )
}
