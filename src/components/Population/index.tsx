import { Box } from '@mui/material'
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
  getTick,
  getTicksPerGeneration,
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
      return getTicksPerGeneration(state)
    } else {
      return getTick(state)
    }
  })

  const dispatch = useDispatch()
  const running = useSelector(isRunning)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>
            Generation {generation}, tick {tick}
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
      <Board />
    </>
  )
}
