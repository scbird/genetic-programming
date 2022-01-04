import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getDesiredActions, getMutatedExpressions } from '../selectors'
import { BoardState } from '../types'
import { setExpressions } from './creature'

export const BOARD_NEXT_TICK = 'BOARD_NEXT_TICK'
export const BOARD_NEXT_GENERATION = 'BOARD_NEXT_GENERATION'

export const step: () => ThunkAction<void, BoardState, any, any> = () => (
  dispatch,
  getState
) => {
  const state = getState()

  if (state.tick === state.ticksPerGeneration) {
    dispatch(mutateCreatures())
  }

  if (state.generation === 0 || state.tick === state.ticksPerGeneration) {
    dispatch(nextGeneration())
  }

  dispatch(nextTick())
  dispatch(performCreatureActions())
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

const mutateCreatures: () => ThunkAction<void, BoardState, any, any> = () => (
  dispatch,
  getState
) => {
  const expressions = getMutatedExpressions(getState())

  dispatch(setExpressions(expressions))
}

function nextGeneration(): AnyAction {
  return { type: BOARD_NEXT_GENERATION }
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
