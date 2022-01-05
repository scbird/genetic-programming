import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getTick, getTicksPerGeneration, isTraining } from '../selectors'
import { BoardState } from '../types'
import { setGeneration, step } from './board'

export const GENERATIONS_CLEAR = 'GENERATIONS_CLEAR'
export const GENERATION_PREPARE_NEXT = 'GENERATION_PREPARE_NEXT'
export const GENERATION_COMPLETE = 'GENERATION_COMPLETE'
export const TRAINING_SET = 'TRAINING_SET'

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
  const start = Date.now()
  dispatch(prepareNextGeneration())
  dispatch(setGeneration(getState().generations.length - 1))

  while (getTick(getState()) < getTicksPerGeneration(getState())) {
    dispatch(step())
  }

  dispatch(completeGeneration())
  console.log(Date.now() - start)
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
