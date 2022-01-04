import { PlayArrow, RestartAlt, SkipNext } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { resetTraining, trainNextGeneration } from '../../program/actions'
import Title from '../Title'
import { Chart } from './Chart'

export const Training: FC = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>Training</Title>
        </Box>
        <Stack direction="row" sx={{ marginTop: -1 }}>
          <IconButton
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={() => dispatch(resetTraining())}>
            <RestartAlt />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => dispatch(trainNextGeneration())}>
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
