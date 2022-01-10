import { createSelector } from 'reselect'
import { parse, stringify } from '../gp'
import { Mutator, regenerate } from '../mutators'
import { BoardState, Creature, Generation } from '../types'
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
  const numSurvivors = Math.ceil(
    getNumCreatures(state) * getSurvivalRate(state)
  )
  // We use log() so that super-fit individuals don't have a massive advantage
  // over others. We add Math.E so that the minimum weight is 1 - we want all
  // creatures to have a chance at reproducing, even if they didn't eat anything
  const weights = scores.map((score) => Math.log(score + Math.E))
  // These are the creatures whose expressions will survive to the next generation.
  // While the creature object itself is different, we keep its index (and thus ID)
  // the same to make it more intuitive for the user
  const survivorIds = scores
    .map((score, id) => ({ id, score }))
    .sort((a, b) => {
      if (a.score != b.score) {
        // Highest scoring first
        return b.score - a.score
      }

      // The scores are the same, so prefer creatures that survived from the previous generation
      // because they're more likely to be fitter, just unlucky this time around.
      // This mostly helps prevent the creatures forgetting how to eat() in the early generations
      // when there are not enough lucky ones that land on food
      const aSurvived = survived(creatures[a.id])
      const bSurvived = survived(creatures[b.id])

      return (bSurvived ? 1 : 0) - (aSurvived ? 1 : 0)
    })
    .slice(0, numSurvivors)
    .map(({ id }) => id)

  return Array(getNumCreatures(state))
    .fill(null)
    .map((_, id) => {
      if (survivorIds.includes(id)) {
        // This creature survived to the next generation
        return {
          expression: creatures[id].expression,
          parentId: creatures[id].id
        }
      } else {
        // Choose a parent and mutate its expression
        const parentIdx = choose(weights)
        const originalExpression = creatures[parentIdx].expression
        const mutatedExpression = stringify(
          MUTATOR(parse(originalExpression), getMutationRate(state))
        )

        return {
          expression: mutatedExpression,
          parentId: creatures[parentIdx].id
        }
      }
    })

  function survived(creature: Creature): boolean {
    return (
      state.generations[state.generations.length - 2]?.creatures[creature.id]
        ?.expression === creature.expression
    )
  }
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
