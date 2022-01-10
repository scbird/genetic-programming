import { Reducer } from 'redux'
import {
  GENERATION_COMPLETE,
  GENERATION_PREPARE_NEXT,
  GENERATIONS_CLEAR
} from '../actions'
import { generate, stringify } from '../gp'
import {
  ExpressionWithLineage,
  getCreatures,
  getCreatureScore,
  getMutatedExpressions,
  getNumCreatures,
  getNumPlants,
  getPlants,
  getTick
} from '../selectors'
import { BoardState, Generation } from '../types'
import { initialState } from './board'
import { createCreature } from './creature'
import { createPlant } from './plant'

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

    case GENERATION_COMPLETE:
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
                creatures: [...getCreatures(state)],
                plants: [...getPlants(state)],
                tick: getTick(state)
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
  let expressions: ExpressionWithLineage[]

  if (state.generations.length === 0) {
    expressions = Array(getNumCreatures(state))
      .fill(null)
      .map(() => ({ expression: stringify(generate()), parentId: undefined }))
  } else {
    expressions = getMutatedExpressions(state)
  }

  return {
    creatures: expressions.map((expressionWithLineage, idx) =>
      createCreature(
        state,
        idx,
        expressionWithLineage.expression,
        expressionWithLineage.parentId
      )
    ),
    plants: Array(getNumPlants(state))
      .fill(null)
      .map((_, idx) => createPlant(state, idx)),
    tick: 0,
    totalScore: 0
  }
}
