import { Reducer } from 'redux'
import {
  GENERATION_COMPLETE,
  GENERATION_PREPARE_NEXT,
  GENERATIONS_CLEAR
} from '../actions'
import { generate } from '../generate'
import {
  getCreatures,
  getCreatureScore,
  getMutatedExpressions,
  getNumCreatures,
  getNumPlants,
  getPlants,
  getTick
} from '../selectors'
import { stringify } from '../stringify'
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
                creatures: getCreatures(state),
                plants: getPlants(state),
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
  let expressions: string[]

  if (state.generations.length === 0) {
    expressions = Array(getNumCreatures(state))
      .fill(null)
      .map(() => stringify(generate()))
  } else {
    expressions = getMutatedExpressions(state)
  }

  return {
    creatures: expressions.map((expression, idx) =>
      createCreature(state, idx, expression)
    ),
    plants: Array(getNumPlants(state))
      .fill(null)
      .map((_, idx) => createPlant(state, idx)),
    tick: 0,
    totalScore: 0
  }
}
