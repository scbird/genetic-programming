import { Reducer } from 'redux'
import { UI_SELECT_CREATURE, UI_PAUSE_SET } from '../actions'
import { BoardState } from '../types'
import { initialState } from './board'

export const uiReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UI_PAUSE_SET:
      return { ...state, ui: { ...state.ui, paused: action.payload } }

    case UI_SELECT_CREATURE:
      return {
        ...state,
        ui: { ...state.ui, selectedCreatureId: action.payload }
      }

    default:
      return state
  }
}
