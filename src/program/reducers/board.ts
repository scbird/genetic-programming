import { Reducer } from 'redux'
import {
  BOARD_NEXT_RUN,
  BOARD_NEXT_TICK,
  BOARD_NUM_CREATURES_SET,
  BOARD_NUM_PLANTS_SET,
  BOARD_RESET_POPULATION,
  BOARD_RUNS_PER_GENERATION_SET,
  BOARD_SELECT_CREATURE,
  BOARD_SET_GENERATION,
  BOARD_SIZE_SET,
  BOARD_TICKS_PER_RUN_SET,
  MUTATION_RATE_SET,
  RUNNING_SET,
  SURVIVAL_RATE_SET,
  TRAINING_SET
} from '../actions'
import { BoardState } from '../types'

export const initialState: BoardState = {
  boardSize: { width: 20, height: 20 },
  ticksPerRun: 50,
  runsPerGeneration: 5,
  generation: 0,
  run: 0,
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
  mutationRate: '0.01',
  selectedCreatureId: 0
}

export const boardReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_RESET_POPULATION:
      return { ...state, tick: 0 }

    case BOARD_SET_GENERATION:
      return {
        ...state,
        generation: action.payload,
        run: 0,
        tick: state.generations[action.payload].tick
      }

    case BOARD_NEXT_TICK:
      return { ...state, tick: state.tick + 1 }

    case BOARD_NEXT_RUN:
      return { ...state, run: state.run + 1, tick: 0 }

    case BOARD_NUM_PLANTS_SET:
      return { ...state, numPlants: action.payload }

    case BOARD_NUM_CREATURES_SET:
      return { ...state, numCreatures: action.payload }

    case BOARD_RUNS_PER_GENERATION_SET:
      return { ...state, runsPerGeneration: action.payload }

    case BOARD_TICKS_PER_RUN_SET:
      return { ...state, ticksPerRun: action.payload }

    case SURVIVAL_RATE_SET:
      return { ...state, survivalRate: action.payload }

    case MUTATION_RATE_SET:
      return { ...state, mutationRate: action.payload }

    case BOARD_SIZE_SET:
      return { ...state, boardSize: action.payload }

    case BOARD_SELECT_CREATURE:
      return { ...state, selectedCreatureId: action.payload }

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

    default:
      return state
  }
}
