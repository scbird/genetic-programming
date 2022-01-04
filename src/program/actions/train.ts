import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getTick, getTicksPerGeneration } from '../selectors'
import { BoardState } from '../types'
import { setGeneration, step } from './board'

export const GENERATIONS_CLEAR = 'GENERATIONS_CLEAR'
export const GENERATION_PREPARE_NEXT = 'GENERATION_PREPARE_NEXT'
export const GENERATION_UPDATE_SCORES = 'GENERATION_UPDATE_SCORES'

export const resetTraining: () => ThunkAction<
  void,
  BoardState,
  any,
  any
> = () => (dispatch) => {
  dispatch(clearGenerations())
  dispatch(trainNextGeneration())
}

export const trainNextGeneration: () => ThunkAction<
  void,
  BoardState,
  any,
  any
> = () => (dispatch, getState) => {
  dispatch(prepareNextGeneration())
  dispatch(setGeneration(getState().generations.length - 1))

  while (getTick(getState()) < getTicksPerGeneration(getState())) {
    dispatch(step())
  }

  dispatch(updateScores())
}

function clearGenerations(): AnyAction {
  return { type: GENERATIONS_CLEAR }
}

function prepareNextGeneration(): AnyAction {
  return { type: GENERATION_PREPARE_NEXT }
}

function updateScores(): AnyAction {
  return { type: GENERATION_UPDATE_SCORES }
}
