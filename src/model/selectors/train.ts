import { createSelector } from 'reselect'
import { parse, stringify } from '../gp'
import { Mutator, regenerate } from '../mutators'
import { BoardState, Generation } from '../types'
import { getMutationRate, getNumCreatures, getSurvivalRate } from './board'
import { getCreatureScore } from './creatures'

export function isTraining(state: BoardState): boolean {
  return state.training
}

const MUTATOR: Mutator = regenerate()

export interface ExpressionWithLineage {
  expression: string
  parentId: number | undefined
}

export function getMutatedExpressions(
  state: BoardState
): ExpressionWithLineage[] {
  const creatures = state.generations[state.generations.length - 1].creatures
  const scores = creatures.map((creature) => getCreatureScore(creature))

  // Get the expressions in order of score
  const bestExpressions = scores
    .map((score, idx) => ({ idx, score }))
    .sort((a, b) => {
      // If the scores are the same (likely because none of the creatures managed
      // to eat anything, use the index. This means that the high-scoring expressions
      // from previous generations don't get lost
      return b.score - a.score || a.idx - b.idx
    })
    .map(({ idx }) => ({
      expression: creatures[idx].expression,
      parentId: creatures[idx].id
    }))

  // Initialise the expressions with the best ones from the previous generation
  const expressionsToKeep = Math.ceil(
    getNumCreatures(state) * getSurvivalRate(state)
  )
  const expressions = bestExpressions.slice(0, expressionsToKeep)

  // Add mutated expressions until we have a new expression for every creature
  while (expressions.length < getNumCreatures(state)) {
    // We use log() so that super-fit individuals don't have a massive advantage
    // over others. We add Math.E so that the minimum weight is 1 - we want all
    // creatures to have a chance at reproducing, even if they didn't eat anything
    const weights = scores.map((score) => Math.log(score + Math.E))
    const parentIdx = choose(weights)
    const originalExpression = creatures[parentIdx].expression
    const mutatedExpression = stringify(
      MUTATOR(parse(originalExpression), getMutationRate(state))
    )

    expressions.push({
      expression: mutatedExpression,
      parentId: creatures[parentIdx].id
    })
  }

  return expressions
}

export const getGenerationScores = createSelector(
  getGenerations,
  (generations) => generations.map(({ totalScore }) => totalScore)
)

export function getGenerations(state: BoardState): readonly Generation[] {
  return state.generations
}

/**
 * Randomly chooses one of the elements, with the probability of it being
 * chosen depending on the value of the element. Returns the index of the
 * chosen element
 */
function choose(weights: readonly number[]): number {
  const total = weights.reduce((acc, score) => acc + score, 0)

  let remaining = Math.random() * total
  let idx = 0

  while (remaining > weights[idx]) {
    remaining -= weights[idx]
    idx++
  }

  return idx
}
