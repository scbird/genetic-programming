import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getDesiredActions, isRunning } from '../selectors'
import { BoardState, Dimension } from '../types'

export const BOARD_RESET_POPULATION = 'BOARD_RESET_POPULATION'
export const BOARD_SET_GENERATION = 'BOARD_SET_GENERATION'
export const BOARD_NEXT_TICK = 'BOARD_NEXT_TICK'
export const BOARD_NUM_PLANTS_SET = 'BOARD_NUM_PLANTS_SET'
export const BOARD_NUM_CREATURES_SET = 'BOARD_NUM_CREATURES_SET'
export const BOARD_TICKS_PER_RUN_SET = 'BOARD_TICKS_PER_RUN_SET'
export const BOARD_RUNS_PER_GENERATION_SET = 'BOARD_RUNS_PER_GENERATION_SET'
export const SURVIVAL_RATE_SET = 'SURVIVAL_RATE_SET'
export const MUTATION_RATE_SET = 'MUTATION_RATE_SET'
export const BOARD_SIZE_SET = 'BOARD_SIZE_SET'
export const RUNNING_SET = 'RUNNING_SET'

const TICKS_PER_SECOND = 10

export const step: () => ThunkAction<void, BoardState, any, any> = () => (
  dispatch
) => {
  dispatch(nextTick())
  dispatch(performCreatureActions())
}

export function setGeneration(generation: number): AnyAction {
  return { type: BOARD_SET_GENERATION, payload: generation }
}

export function resetPopulation(): AnyAction {
  return { type: BOARD_RESET_POPULATION }
}

export function setNumPlants(numPlants: number): AnyAction {
  return { type: BOARD_NUM_PLANTS_SET, payload: numPlants }
}

export function setNumCreatures(numCreatures: number): AnyAction {
  return { type: BOARD_NUM_CREATURES_SET, payload: numCreatures }
}

export function setRunsPerGeneration(runsPerGeneration: number): AnyAction {
  return { type: BOARD_RUNS_PER_GENERATION_SET, payload: runsPerGeneration }
}

export function setTicksPerRun(ticksPerRun: number): AnyAction {
  return { type: BOARD_TICKS_PER_RUN_SET, payload: ticksPerRun }
}

export function setBoardSize(size: Dimension): AnyAction {
  return { type: BOARD_SIZE_SET, payload: size }
}

export function startRunning(): ThunkAction<void, BoardState, any, any> {
  return (dispatch, getState) => {
    if (isRunning(getState())) {
      return
    }

    dispatch(setRunning(true))
    run()

    function run() {
      const start = Date.now()
      dispatch(step())
      const elapsed = (Date.now() - start) / 1000
      const wait = Math.max(0, 1000 / TICKS_PER_SECOND - elapsed)

      setTimeout(() => {
        if (isRunning(getState())) {
          run()
        }
      }, wait)
    }
  }
}

export function stopRunning(): AnyAction {
  return setRunning(false)
}

export function setSurvivalRate(survivalRate: string): AnyAction {
  return { type: SURVIVAL_RATE_SET, payload: survivalRate }
}

export function setMutationRate(mutationRate: string): AnyAction {
  return { type: MUTATION_RATE_SET, payload: mutationRate }
}

function setRunning(running: boolean): AnyAction {
  return { type: RUNNING_SET, payload: running }
}

const performCreatureActions: () => ThunkAction<
  void,
  BoardState,
  any,
  any
> = () => {
  return (dispatch, getState) => {
    // Get the actions the creatures wish to perform
    const actions = getDesiredActions(getState())

    // Perform the actions in non-deterministic order, so that creatures with lower IDs don't
    // have an advantage over ones with higher IDs
    shuffle(actions)

    // Perform the requested actions
    actions.forEach((action) => dispatch(action))
  }
}

function nextTick(): AnyAction {
  return { type: BOARD_NEXT_TICK }
}

function shuffle<T>(items: T[]) {
  for (let srcIdx = 0; srcIdx < items.length; srcIdx++) {
    const destIdx = Math.floor(Math.random() * items.length)
    const source = items[srcIdx]

    items[srcIdx] = items[destIdx]
    items[destIdx] = source
  }
}
