import { Reducer } from 'redux'
import {
  CREATURE_MOVE,
  CREATURE_SET_REQUESTED_ACTIONS,
  CREATURE_TURN
} from '../actions'
import { BoardState } from '../types'
import { normalizeHeading } from '../util'
import { initialState } from './board'

const MAX_TURN = Math.PI / 4
const MAX_MOVE = 2

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

    default:
      return state
  }
}
