import { PlayArrow, RestartAlt, SkipNext } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'
import React, { FC } from 'react'
import Title from '../Title'
import { Chart } from './Chart'

export const Training: FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>Training</Title>
        </Box>
        <Stack direction="row" sx={{ marginTop: -1 }}>
          <IconButton color="primary" sx={{ marginRight: 1 }}>
            <RestartAlt />
          </IconButton>
          <IconButton color="primary">
            <SkipNext />
          </IconButton>
          <IconButton color="primary">
            <PlayArrow />
          </IconButton>
        </Stack>
      </Box>
      <Chart />
    </>
  )
}
