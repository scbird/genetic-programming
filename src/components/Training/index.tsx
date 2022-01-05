import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetTraining,
  startTraining,
  stopTraining,
  trainNextGeneration
} from '../../program/actions'
import { isTraining } from '../../program/selectors'
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
            onStep={() => dispatch(trainNextGeneration())}
            onStart={() => dispatch(startTraining())}
            onStop={() => dispatch(stopTraining())}
          />
        </Box>
      </Box>
      <Chart />
    </>
  )
}
