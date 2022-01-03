import { Reducer } from 'redux'
import { CREATURE_EAT } from '../actions'
import { getCreatures, getPlants } from '../selectors'
import { BoardState, Creature, Plant } from '../types'
import { initialState } from './board'

export const plantsReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
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
