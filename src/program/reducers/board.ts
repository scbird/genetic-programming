import { Reducer } from 'redux'
import {
  BOARD_NEXT_TICK,
  BOARD_RESET_POPULATION,
  BOARD_NUM_PLANTS_SET,
  BOARD_NUM_CREATURES_SET,
  BOARD_TICKS_PER_GENERATION_SET,
  BOARD_SIZE_SET,
  BOARD_SET_GENERATION
} from '../actions'
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
  numPlants: 20,
  generations: []
}

export const boardReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_RESET_POPULATION:
      return { ...state, tick: 0 }

    case BOARD_SET_GENERATION:
      return { ...state, generation: action.payload }

    case BOARD_NEXT_TICK:
      return { ...state, tick: state.tick + 1 }

    case BOARD_NUM_PLANTS_SET:
      return { ...state, numPlants: action.payload }

    case BOARD_NUM_CREATURES_SET:
      return { ...state, numCreatures: action.payload }

    case BOARD_TICKS_PER_GENERATION_SET:
      return { ...state, ticksPerGeneration: action.payload }

    case BOARD_SIZE_SET:
      return { ...state, boardSize: action.payload }

    default:
      return state
  }
}
