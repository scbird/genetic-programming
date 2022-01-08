import { Reducer } from 'redux'
import { BoardState } from '../types'
import { boardReducer, initialState } from './board'
import { creaturesReducer } from './creature'
import { generationsReducer } from './generations'
import { plantsReducer } from './plant'
import { uiReducer } from './ui'

export const reducer: Reducer<BoardState> = (state = initialState, action) => {
  state = boardReducer(state, action)
  state = creaturesReducer(state, action)
  state = plantsReducer(state, action)
  state = generationsReducer(state, action)
  state = uiReducer(state, action)

  return state
}
