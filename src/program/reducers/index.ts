import { Reducer } from 'redux'
import { BoardState } from '../types'
import { boardReducer, initialState } from './board'
import { creaturesReducer } from './creature'
import { plantsReducer } from './plant'

export const reducer: Reducer<BoardState> = (state = initialState, action) => {
  state = boardReducer(state, action)
  state = plantsReducer(state, action)
  state = creaturesReducer(state, action)

  return state
}
