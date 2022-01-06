import { Reducer } from 'redux'
import {
  BOARD_NEXT_TICK,
  BOARD_RESET_POPULATION,
  BOARD_NUM_PLANTS_SET,
  BOARD_NUM_CREATURES_SET,
  BOARD_TICKS_PER_GENERATION_SET,
  BOARD_SIZE_SET,
  BOARD_SET_GENERATION,
  TRAINING_SET,
  GENERATIONS_CLEAR,
  RUNNING_SET,
  SURVIVAL_RATE_SET,
  MUTATION_RATE_SET
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
  generations: [],
  training: false,
  running: false,
  survivalRate: '0.5',
  mutationRate: '0.01'
}

export const boardReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_RESET_POPULATION:
      return { ...state, tick: 0, running: false }

    case BOARD_SET_GENERATION:
      return {
        ...state,
        generation: action.payload,
        tick: state.generations[action.payload].tick
      }

    case BOARD_NEXT_TICK:
      return { ...state, tick: state.tick + 1 }

    case BOARD_NUM_PLANTS_SET:
      return { ...state, numPlants: action.payload }

    case BOARD_NUM_CREATURES_SET:
      return { ...state, numCreatures: action.payload }

    case BOARD_TICKS_PER_GENERATION_SET:
      return { ...state, ticksPerGeneration: action.payload }

    case SURVIVAL_RATE_SET:
      return { ...state, survivalRate: action.payload }

    case MUTATION_RATE_SET:
      return { ...state, mutationRate: action.payload }

    case BOARD_SIZE_SET:
      return { ...state, boardSize: action.payload }

    case TRAINING_SET:
      return {
        ...state,
        training: action.payload,
        running: action.payload ? false : state.running
      }

    case RUNNING_SET:
      return {
        ...state,
        training: action.payload ? false : state.training,
        running: action.payload
      }

    case GENERATIONS_CLEAR:
      return { ...state, training: false }

    default:
      return state
  }
}
