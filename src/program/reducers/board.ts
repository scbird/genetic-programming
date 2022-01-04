import { Reducer } from 'redux'
import { BOARD_NEXT_TICK, BOARD_NEXT_GENERATION } from '../actions'
import { BoardState } from '../types'

export const initialState: BoardState = {
  boardSize: { width: 20, height: 20 },
  ticksPerGeneration: 200,
  generation: 0,
  tick: 0,
  creatures: [],
  plants: [],
  plantRestoreDelay: 5,
  creatureRestoreDelay: 5,
  numCreatures: 20,
  numPlants: 20
}

export const boardReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_NEXT_GENERATION:
      return { ...state, generation: state.generation + 1, tick: 0 }

    case BOARD_NEXT_TICK:
      return { ...state, tick: state.tick + 1 }

    default:
      return state
  }
}
