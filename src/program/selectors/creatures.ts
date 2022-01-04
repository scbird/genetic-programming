import { AnyAction } from 'redux'
import { getRequestedAction } from '../getRequestedAction'
import { mutate } from '../mutate'
import { parse } from '../parse'
import { stringify } from '../stringify'
import { BoardState, Creature, Plant } from '../types'
import {
  getDistance,
  getHeading,
  getNearestTo,
  getRelativeAngle,
  HasLocation,
  normalizeHeading
} from '../util'
import { getCreatures, getPlants } from './board'

const MAX_EAT_DISTANCE = 1
const MAX_EAT_ANGLE = Math.PI / 4
const PLANT_SCORE = 1
const CREATURE_SCORE = 5
const KEEP_PORTION = 0.5

export function getClosestCreatureDistance(
  state: BoardState,
  id: number
): number {
  const creature = getCreatures(state)[id]

  return getDistance(creature, getClosestCreatureTo(state, id))
}

export function getClosestCreatureAngle(state: BoardState, id: number): number {
  const creature = getCreatures(state)[id]
  const closest = getClosestCreatureTo(state, id)
  const headingToClosest = getHeading(creature, closest)

  return getRelativeAngle(creature.heading, headingToClosest)
}

export function getClosestPlantDistance(state: BoardState, id: number): number {
  const creature = getCreatures(state)[id]

  return getDistance(creature, getClosestPlantTo(state, id))
}

export function getClosestPlantAngle(state: BoardState, id: number): number {
  const creature = getCreatures(state)[id]
  const closestPlant = getClosestPlantTo(state, id)
  const headingToClosest = getHeading(creature, closestPlant)

  return getRelativeAngle(creature.heading, headingToClosest)
}

export function getCreatureExpression(state: BoardState, id: number): string {
  return getCreatures(state)[id].expression
}

export function getWouldEat(
  state: BoardState,
  id: number
): Creature | Plant | null {
  return getWouldEatCreature(state, id) ?? getWouldEatPlant(state, id)
}

export function getDesiredActions(state: BoardState): AnyAction[] {
  return getCreatures(state)
    .filter((creature) => creature.diedAt === null)
    .map((creature) => getRequestedAction(state, creature.id))
    .filter((action): action is AnyAction => action !== null)
}

export function getMutatedExpressions(state: BoardState): string[] {
  // Ensures all creatures have a chance at being selected, even if they didn't eat anything
  const BASE_SCORE = 0.1

  const creatures = getCreatures(state)
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
  const expressionsToKeep = Math.ceil(bestExpressions.length * KEEP_PORTION)
  const expressions = bestExpressions.slice(0, expressionsToKeep)

  // Add mutated expressions until we have a new expression for every creature
  while (expressions.length < creatures.length) {
    const parentIdx = choose(scores)
    const originalExpression = creatures[parentIdx].expression
    const mutatedExpression = stringify(mutate(parse(originalExpression)))

    expressions.push(mutatedExpression)
  }

  return expressions
}

export function getCreatureScore(creature: Creature): number {
  return (
    creature.creaturesEaten * CREATURE_SCORE +
    creature.plantsEaten * PLANT_SCORE
  )
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

function getWouldEatPlant(state: BoardState, id: number) {
  return getWouldEatObject(getCreatures(state)[id], getPlants(state))
}

function getWouldEatCreature(state: BoardState, id: number) {
  const creatures = getCreatures(state)

  return getWouldEatObject(
    creatures[id],
    creatures.filter((creature) => creature.id !== id)
  )
}

function getWouldEatObject<T extends HasLocation>(
  creature: Creature,
  objects: readonly T[]
): T | null {
  const objectDistances = objects
    .map((curr) => [curr, getDistance(creature, curr)] as [T, number])
    .filter(([curr, distance]) => {
      const headingToObject = getHeading(creature, curr)
      const angleToObject = normalizeHeading(creature.heading - headingToObject)

      return (
        distance <= MAX_EAT_DISTANCE && Math.abs(angleToObject) <= MAX_EAT_ANGLE
      )
    })
    .sort((a, b) => a[1] - b[1])

  return objectDistances[0]?.[0] ?? null
}

function getClosestCreatureTo(state: BoardState, id: number): Creature {
  const creatures = getCreatures(state)

  return getNearestTo(
    creatures[id],
    creatures.filter((creature) => creature.id !== id)
  )
}

function getClosestPlantTo(state: BoardState, id: number): Plant {
  return getNearestTo(getCreatures(state)[id], getPlants(state))
}
