import { Close } from '@mui/icons-material'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BoardState,
  getCreatures,
  getGeneration,
  getPopulationScore,
  getSelectedCreatureId,
  getTick,
  getTicksPerRun,
  isPaused,
  isRunning,
  isTraining,
  resetPopulation,
  selectCreature,
  startRunning,
  step,
  stopRunning
} from '../../model'
import { ControlBar } from '../ControlBar'
import Title from '../Title'
import { Board } from './Board'
import { Creature } from './Creature'
import { CreatureDetails } from './CreatureDetails'
import { ScoreBoard } from './ScoreBoard'

export const Population: FC = () => {
  const generation = useSelector(getGeneration)

  // These selectors are structured like this because we don't want to update per-tick when we're training
  const tick = useSelector((state: BoardState) => {
    if (isUiPaused(state)) {
      return getTicksPerRun(state)
    } else {
      return getTick(state)
    }
  })
  const score = useSelector((state: BoardState) => {
    if (isUiPaused(state)) {
      return null
    } else {
      return getPopulationScore(state)
    }
  })
  const selectedCreature = useSelector((state: BoardState) => {
    const selectedCreatureId = getSelectedCreatureId(state)

    return (
      (!isUiPaused(state) &&
        selectedCreatureId !== undefined &&
        getCreatures(state)[selectedCreatureId]) ||
      undefined
    )
  })
  const training = useSelector(isTraining)
  const running = useSelector(isRunning)
  const pauseUi = useSelector(isUiPaused)
  const dispatch = useDispatch()
  const boardWidth = 600

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
            resetTooltip="Clear all scores and randomise the population. The creatures' expressions will remain unchanged"
            onStep={() => dispatch(step())}
            stepTooltip="Progress to the next tick of the population simulation. The desired action of each creature will be determined and executed"
            onStart={() => dispatch(startRunning())}
            startTooltip="Start the population simulation"
            onStop={() => dispatch(stopRunning())}
            stopTooltip="Stop the population simulation"
          />
        </Box>
      </Box>
      <Grid container>
        <Grid item md={8}>
          <Box width={boardWidth}>
            <Board width={boardWidth} />
            <Stack mt={3} alignItems="center">
              <Typography variant={'muted' as any}>
                Click on a creature to view its details
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={4}>
          {selectedCreature ? (
            <>
              <Title color="black">
                <Stack direction="row" alignItems="center">
                  <Creature
                    creature={{ ...selectedCreature, heading: 0 }}
                    width="1em"
                  />
                  <div style={{ paddingLeft: '0.75em' }}>
                    Creature {selectedCreature.id}
                    {selectedCreature.diedAt !== null && ' (dead)'}
                  </div>
                  <Box style={{ flex: 1, textAlign: 'right' }}>
                    <IconButton
                      onClick={() => dispatch(selectCreature(undefined))}>
                      <Close style={{ color: 'gray' }} />
                    </IconButton>
                  </Box>
                </Stack>
              </Title>
              <CreatureDetails creature={selectedCreature} />
            </>
          ) : (
            !pauseUi && <ScoreBoard />
          )}
        </Grid>
      </Grid>
    </>
  )
}

function isUiPaused(state: BoardState) {
  return isPaused(state) || isTraining(state)
}
