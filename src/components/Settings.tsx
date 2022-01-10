import { Grid, TextField, Tooltip } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBoardSize,
  getNumCreatures,
  getNumPlants,
  getRawMutationRate,
  getRawSurvivalRate,
  getRunsPerGeneration,
  getTicksPerRun,
  setBoardSize,
  setMutationRate,
  setNumCreatures,
  setNumPlants,
  setRunsPerGeneration,
  setSurvivalRate,
  setTicksPerRun
} from '../model'
import Title from './Title'

export const Settings: FC = () => {
  const dispatch = useDispatch()
  const numPlants = useSelector(getNumPlants)
  const numCreatures = useSelector(getNumCreatures)
  const survivalRate = useSelector(getRawSurvivalRate)
  const mutationRate = useSelector(getRawMutationRate)
  const runsPerGeneration = useSelector(getRunsPerGeneration)
  const ticksPerRun = useSelector(getTicksPerRun)
  const boardSize = useSelector(getBoardSize).width

  return (
    <>
      <Title>Settings</Title>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Tooltip title="How many plants to place on the board">
            <TextField
              label="Number of plants"
              value={numPlants}
              variant="standard"
              size="small"
              onChange={(event) => {
                const value = event.target.value

                if (isInteger(value) && isPositive(value)) {
                  dispatch(setNumPlants(+value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="How many creatures to place on the board">
            <TextField
              label="Number of creatures"
              variant="standard"
              value={numCreatures}
              size="small"
              onChange={(event) => {
                const value = event.target.value

                if (isInteger(value) && isPositive(value)) {
                  dispatch(setNumCreatures(+value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="How many ticks per run when evolving the population. Larger values give each creature more time to eat food before the board is reset. Does not affect population simulator">
            <TextField
              label="Ticks per run"
              variant="standard"
              size="small"
              value={ticksPerRun}
              onChange={(event) => {
                const value = event.target.value

                if (isInteger(value) && isPositive(value)) {
                  dispatch(setTicksPerRun(+value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="How many runs per generation when evolving the population. Larger values help average out the score so that a creature's score is less likely to be influenced by the starting conditions of each run. Does not affect population simulator">
            <TextField
              label="Runs per generation"
              variant="standard"
              size="small"
              value={runsPerGeneration}
              onChange={(event) => {
                const value = event.target.value

                if (isInteger(value) && isPositive(value)) {
                  dispatch(setRunsPerGeneration(+value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="What portion of the creatures survive through to the next generation. Range: 0 (all die and are replaced by their children) to 1 (all survive and there are no children)">
            <TextField
              label="Survival rate"
              variant="standard"
              size="small"
              value={survivalRate}
              onChange={(event) => {
                const value = event.target.value

                if (isZeroOrPositive(value)) {
                  dispatch(setSurvivalRate(value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="How much of a new creature's code differs from its parent. Range: 0 (identical) to 1 (completely different)">
            <TextField
              label="Mutation rate"
              variant="standard"
              size="small"
              value={mutationRate}
              onChange={(event) => {
                const value = event.target.value

                if (isZeroOrPositive(value)) {
                  dispatch(setMutationRate(value))
                }
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={6}>
          <Tooltip title="How large the board should be. Larger boards make it harder to find things to eat">
            <TextField
              label="Board size"
              variant="standard"
              size="small"
              value={boardSize}
              onChange={(event) => {
                const value = event.target.value

                if (isInteger(value) && isPositive(value)) {
                  dispatch(setBoardSize({ width: +value, height: +value }))
                }
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </>
  )
}

function isPositive(number: string): boolean {
  return toNumber(number) > 0
}

function isZeroOrPositive(number: string): boolean {
  return toNumber(number) >= 0
}

function isInteger(number: string) {
  return Math.floor(+number) === +number
}

function toNumber(number: string): number {
  // Accept numbers that have a trailing decimal point so the user can type
  return +number.replace(/\.$/, '')
}
