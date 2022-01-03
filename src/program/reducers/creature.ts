import { Reducer } from 'redux'
import {
  CREATURE_EAT,
  CREATURE_MOVE,
  CREATURE_SET_REQUESTED_ACTIONS,
  CREATURE_TURN
} from '../actions'
import { getCreatures, getPlants } from '../selectors'
import { BoardState, Creature, Plant } from '../types'
import { normalizeHeading } from '../util'
import { initialState } from './board'

const MAX_TURN = Math.PI / 4
const MAX_MOVE = 2
const EATING_SCORES = {
  creature: 5,
  plant: 1
}

export const creaturesReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATURE_SET_REQUESTED_ACTIONS:
      return {
        ...state,
        creatures: state.creatures.map((creature) => {
          const requestedAction = action.payload[creature.id]

          if (requestedAction === undefined) {
            return creature
          } else {
            return { ...creature, requestedAction }
          }
        })
      }

    case CREATURE_TURN:
      return {
        ...state,
        creatures: state.creatures.map((creature) => {
          if (creature.id === action.payload.id && creature.diedAt === null) {
            const angle = Math.max(
              -MAX_TURN,
              Math.min(action.payload.angle, MAX_TURN)
            )

            return {
              ...creature,
              heading: normalizeHeading(creature.heading + angle)
            }
          } else {
            return creature
          }
        })
      }

    case CREATURE_MOVE:
      return {
        ...state,
        creatures: state.creatures.map((creature) => {
          if (creature.id === action.payload.id && creature.diedAt === null) {
            const distance = Math.max(
              -MAX_MOVE,
              Math.min(action.payload.distance, MAX_MOVE)
            )

            return {
              ...creature,
              location: {
                x: Math.max(
                  0,
                  Math.min(
                    creature.location.x + distance * Math.cos(creature.heading),
                    state.boardSize.width
                  )
                ),
                y: Math.max(
                  0,
                  Math.min(
                    creature.location.y + distance * Math.sin(creature.heading),
                    state.boardSize.height
                  )
                )
              }
            }
          } else {
            return creature
          }
        })
      }

    case CREATURE_EAT:
      const eatingCreature = getCreatures(state)[action.payload.id]
      let target: Creature | Plant | undefined

      if (action.payload.type === 'creature') {
        target = getCreatures(state)[action.payload.targetId]
      } else if (action.payload.type === 'plant') {
        target = getPlants(state)[action.payload.targetId]
      } else {
        target = undefined
      }

      if (
        eatingCreature?.diedAt === null &&
        target?.diedAt === null &&
        eatingCreature !== target
      ) {
        return {
          ...state,
          creatures: state.creatures.map((creature) => {
            if (target === creature) {
              return { ...creature, diedAt: state.tick }
            } else if (action.payload.id === creature.id) {
              return {
                ...creature,
                score: creature.score + EATING_SCORES[target!.type]
              }
            } else {
              return creature
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
