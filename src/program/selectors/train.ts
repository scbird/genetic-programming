import { createSelector } from 'reselect'
import { mutate } from '../mutate'
import { parse } from '../parse'
import { stringify } from '../stringify'
import { BoardState, Generation } from '../types'
import { getMutationRate, getNumCreatures, getSurvivalRate } from './board'
import { getCreatureScore } from './creatures'

export function isTraining(state: BoardState): boolean {
  return state.training
}

export function getMutatedExpressions(state: BoardState): string[] {
  // Ensures all creatures have a chance at being selected, even if they didn't eat anything
  const BASE_SCORE = 0.1

  const creatures = state.generations[state.generations.length - 1].creatures
  const scores = creatures.map(
    (creature) => getCreatureScore(creature) + BASE_SCORE
  )

  // Get the expressions in order of score
  const bestExpressions = scores
    .map((score, idx) => ({ idx, score }))
    .sort((a, b) => {
      // If the scores are the same (likely because none of the creatures managed
      // to eat anything, use the index. This means that the high-scoring expressions
      // from previous generations don't get lost
      return b.score - a.score || a.idx - b.idx
    })
    .map(({ idx }) => creatures[idx].expression)

  // Initialise the expressions with the best ones from the previous generation
  const expressionsToKeep = Math.ceil(
    getNumCreatures(state) * getSurvivalRate(state)
  )
  const expressions = bestExpressions.slice(0, expressionsToKeep)

  // Add mutated expressions until we have a new expression for every creature
  while (expressions.length < getNumCreatures(state)) {
    const parentIdx = choose(scores)
    const originalExpression = creatures[parentIdx].expression
    const mutatedExpression = stringify(
      mutate(parse(originalExpression), getMutationRate(state))
    )

    expressions.push(mutatedExpression)
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
