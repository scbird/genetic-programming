import { Reducer } from 'redux'
import { BoardState } from '../types'
import { boardReducer, initialState } from './board'
import { creaturesReducer } from './creature'
import { generationsReducer } from './generations'
import { plantsReducer } from './plant'

export const reducer: Reducer<BoardState> = (state = initialState, action) => {
  state = boardReducer(state, action)
  state = creaturesReducer(state, action)
  state = plantsReducer(state, action)
  state = generationsReducer(state, action)

  return state
}
