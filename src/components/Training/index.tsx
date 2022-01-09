import { Box, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  isTraining,
  resetTraining,
  startTraining,
  stopTraining,
  trainNextGeneration
} from '../../model'
import { ControlBar } from '../ControlBar'
import Title from '../Title'
import { Chart } from './Chart'

export const Training: FC = () => {
  const dispatch = useDispatch()
  const training = useSelector(isTraining)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>Training</Title>
        </Box>
        <Box sx={{ marginTop: -1 }}>
          <ControlBar
            running={training}
            onReset={() => dispatch(resetTraining())}
            resetTooltip="Resets the training and clears the generation history"
            onStep={() => dispatch(trainNextGeneration())}
            stepTooltip="Train a single generation"
            onStart={() => dispatch(startTraining())}
            startTooltip="Start training new generations. Click this button again to stop training"
            onStop={() => dispatch(stopTraining())}
            stopTooltip="Stop training new generations"
          />
        </Box>
      </Box>
      <Chart />
      <Stack mt={3} alignItems="center">
        <Typography variant={'muted' as any}>
          Click on a generation to view its population
        </Typography>
      </Stack>
    </>
  )
}
