import { PlayArrow, RestartAlt, SkipNext } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetTraining,
  startTraining,
  stopTraining,
  trainNextGeneration
} from '../../program/actions'
import { isTraining } from '../../program/selectors'
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
          <IconButton
            color={training ? 'secondary' : 'primary'}
            onClick={() =>
              dispatch(training ? stopTraining() : startTraining())
            }>
            <PlayArrow />
          </IconButton>
        </Stack>
      </Box>
      <Chart />
    </>
  )
}
