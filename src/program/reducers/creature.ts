import { Reducer } from 'redux'
import {
  BOARD_NEXT_GENERATION,
  BOARD_NEXT_TICK,
  CREATURE_EAT,
  CREATURE_MOVE,
  CREATURE_TURN,
  CREATURES_SET_EXPRESSIONS
} from '../actions'
import { generate } from '../generate'
import {
  getCreatures,
  getPlants,
  getRandomHeading,
  getRandomLocation
} from '../selectors'
import { stringify } from '../stringify'
import { BoardState, Creature, Plant } from '../types'
import { normalizeHeading } from '../util'
import { initialState } from './board'

const MAX_TURN = Math.PI / 4
const MAX_MOVE = 2

export const creaturesReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOARD_NEXT_GENERATION:
      return {
        ...state,
        creatures: Array(state.numCreatures)
          .fill(null)
          .map(
            (_, idx): Creature => {
              return {
                id: idx,
                type: 'creature',
                expression:
                  state.creatures[idx]?.expression ?? stringify(generate()),
                creaturesEaten: 0,
                plantsEaten: 0,
                heading: getRandomHeading(),
                location: getRandomLocation(state),
                diedAt: null
              }
            }
          )
      }

    case BOARD_NEXT_TICK:
      return {
        ...state,
        creatures: state.creatures.map((creature) => {
          if (
            creature.diedAt !== null &&
            state.tick > creature.diedAt + state.creatureRestoreDelay
          ) {
            return {
              ...creature,
              diedAt: null,
              location: getRandomLocation(state),
              heading: getRandomHeading()
            }
          } else {
            return creature
          }
        })
      }

    case CREATURES_SET_EXPRESSIONS:
      return {
        ...state,
        creatures: state.creatures.map((creature) => ({
          ...creature,
          expression: action.payload[creature.id] ?? creature.expression
        }))
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
                plantsEaten:
                  creature.plantsEaten + (target?.type === 'plant' ? 1 : 0),
                creaturesEaten:
                  creature.creaturesEaten +
                  (target?.type === 'creature' ? 1 : 0)
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
