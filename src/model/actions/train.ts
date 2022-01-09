import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  getRun,
  getRunsPerGeneration,
  getTick,
  getTicksPerRun,
  isTraining
} from '../selectors'
import { BoardState } from '../types'
import { setGeneration, step } from './board'
import { pauseUi, unPauseUi } from './ui'

export const GENERATIONS_CLEAR = 'GENERATIONS_CLEAR'
export const GENERATION_PREPARE_NEXT = 'GENERATION_PREPARE_NEXT'
export const GENERATION_COMPLETE = 'GENERATION_COMPLETE'
export const TRAINING_SET = 'TRAINING_SET'
export const BOARD_NEXT_RUN = 'BOARD_NEXT_RUN'

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
  try {
    dispatch(pauseUi())

    dispatch(prepareNextGeneration())
    dispatch(setGeneration(getState().generations.length - 1))

    while (getRun(getState()) < getRunsPerGeneration(getState())) {
      dispatch(nextRun())

      while (getTick(getState()) < getTicksPerRun(getState())) {
        dispatch(step())
      }
    }

    dispatch(completeGeneration())
  } finally {
    dispatch(unPauseUi())
  }
}

export function startTraining(): ThunkAction<void, BoardState, any, any> {
  return (dispatch, getState) => {
    if (isTraining(getState())) {
      return
    }

    dispatch(setTraining(true))
    train()

    function train() {
      dispatch(trainNextGeneration())

      setTimeout(() => {
        if (isTraining(getState())) {
          train()
        }
      })
    }
  }
}

export function stopTraining(): AnyAction {
  return setTraining(false)
}

function setTraining(training: boolean): AnyAction {
  return { type: TRAINING_SET, payload: training }
}

function clearGenerations(): AnyAction {
  return { type: GENERATIONS_CLEAR }
}

function prepareNextGeneration(): AnyAction {
  return { type: GENERATION_PREPARE_NEXT }
}

function completeGeneration(): AnyAction {
  return { type: GENERATION_COMPLETE }
}

function nextRun(): AnyAction {
  return { type: BOARD_NEXT_RUN }
}
