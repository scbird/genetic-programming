import { Reducer } from 'redux'
import {
  GENERATION_PREPARE_NEXT,
  GENERATION_UPDATE_SCORES,
  GENERATIONS_CLEAR
} from '../actions'
import { generate } from '../generate'
import {
  getCreatures,
  getCreatureScore,
  getMutatedExpressions,
  getNumCreatures
} from '../selectors'
import { stringify } from '../stringify'
import { BoardState, Generation, GenerationCreature } from '../types'
import { initialState } from './board'

export const generationsReducer: Reducer<BoardState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GENERATIONS_CLEAR:
      return {
        ...state,
        generation: 0,
        generations: []
      }

    case GENERATION_PREPARE_NEXT:
      return {
        ...state,
        generations: [...state.generations, createNewGeneration(state)]
      }

    case GENERATION_UPDATE_SCORES:
      return {
        ...state,
        generations: state.generations.map(
          (generation, idx, generations): Generation => {
            if (idx === generations.length - 1) {
              return {
                totalScore: getCreatures(state).reduce(
                  (acc, creature) => acc + getCreatureScore(creature),
                  0
                ),
                creatures: getCreatures(state).map(
                  ({ expression, creaturesEaten, plantsEaten }) => ({
                    expression,
                    creaturesEaten,
                    plantsEaten
                  })
                )
              }
            } else {
              return generation
            }
          }
        )
      }
    default:
      return state
  }
}

function createNewGeneration(state: BoardState): Generation {
  if (state.generations.length === 0) {
    return {
      totalScore: 0,
      creatures: createCreatures(
        Array(getNumCreatures(state))
          .fill(null)
          .map(() => stringify(generate()))
      )
    }
  } else {
    return {
      totalScore: 0,
      creatures: createCreatures(getMutatedExpressions(state))
    }
  }
}

function createCreatures(expressions: readonly string[]): GenerationCreature[] {
  return expressions.map((expression) => ({
    expression,
    creaturesEaten: 0,
    plantsEaten: 0
  }))
}
