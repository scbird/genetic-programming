import { Reducer } from 'redux'
import {
  BOARD_NEXT_GENERATION,
  BOARD_NEXT_TICK,
  CREATURE_EAT
} from '../actions'
import { getCreatures, getPlants, getRandomLocation } from '../selectors'
import { BoardState, Creature, Plant } from '../types'
import { initialState } from './board'

export const plantsReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_NEXT_GENERATION:
      return {
        ...state,
        plants: Array(state.numPlants)
          .fill(null)
          .map(
            (_, idx): Plant => {
              return {
                id: idx,
                type: 'plant',
                location: getRandomLocation(state),
                diedAt: null
              }
            }
          )
      }

    case BOARD_NEXT_TICK:
      return {
        ...state,
        plants: getPlants(state).map(
          (plant): Plant => {
            if (
              plant.diedAt !== null &&
              state.tick > plant.diedAt + state.plantRestoreDelay
            ) {
              return {
                ...plant,
                diedAt: null,
                location: getRandomLocation(state)
              }
            } else {
              return plant
            }
          }
        )
      }

    case CREATURE_EAT:
      const eatingCreature = getCreatures(state)[action.payload.id]
      let target: Creature | Plant | undefined

      if (action.payload.type === 'plant') {
        target = getPlants(state)[action.payload.targetId]
      } else {
        target = undefined
      }

      if (eatingCreature?.diedAt === null && target?.diedAt === null) {
        return {
          ...state,
          plants: state.plants.map((plant) => {
            if (target === plant) {
              return { ...plant, diedAt: state.tick }
            } else {
              return plant
            }
          })
        }
      } else {
        return state
      }

    default:
      return state
  }
}
