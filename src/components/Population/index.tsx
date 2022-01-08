import { Box, Grid } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetPopulation,
  startRunning,
  step,
  stopRunning
} from '../../program/actions'
import {
  getGeneration,
  getPopulationScore,
  getTick,
  getTicksPerRun,
  isRunning,
  isTraining
} from '../../program/selectors'
import { BoardState } from '../../program/types'
import { ControlBar } from '../ControlBar'
import Title from '../Title'
import { Board } from './Board'

export const Population: FC = () => {
  const generation = useSelector(getGeneration)
  const tick = useSelector((state: BoardState) => {
    // Don't update per-tick when training
    if (isTraining(state)) {
      return getTicksPerRun(state)
    } else {
      return getTick(state)
    }
  })
  const score = useSelector((state: BoardState) => {
    if (isTraining(state)) {
      return null
    } else {
      return getPopulationScore(state)
    }
  })
  const training = useSelector(isTraining)
  const running = useSelector(isRunning)
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>
            Generation {generation}
            {!training && `, tick ${tick}`}
            {!training && `, score ${score}`}
          </Title>
        </Box>
        <Box sx={{ marginTop: -1 }}>
          <ControlBar
            running={running}
            onReset={() => dispatch(resetPopulation())}
            onStep={() => dispatch(step())}
            onStart={() => dispatch(startRunning())}
            onStop={() => dispatch(stopRunning())}
          />
        </Box>
      </Box>
      <Grid container>
        <Grid item md={8}>
          <Board />
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </>
  )
}
