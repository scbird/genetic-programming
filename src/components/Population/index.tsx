import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopulation, step } from '../../program/actions'
import { getGeneration } from '../../program/selectors'
import { ControlBar } from '../ControlBar'
import Title from '../Title'
import { Board } from './Board'

export const Population: FC = () => {
  const generation = useSelector(getGeneration)
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Title>Generation {generation}</Title>
        </Box>
        <Box sx={{ marginTop: -1 }}>
          <ControlBar
            running={false}
            onReset={() => dispatch(resetPopulation())}
            onStep={() => dispatch(step())}
            onStart={() => {}}
            onStop={() => {}}
          />
        </Box>
      </Box>
      <Board />
    </>
  )
}
