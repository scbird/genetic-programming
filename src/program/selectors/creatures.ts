import { AnyAction } from 'redux'
import { createSelector } from 'reselect'
import { getRequestedAction } from '../getRequestedAction'
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

export function getCreatureScore(creature: Creature): number {
  return (
    creature.creaturesEaten * CREATURE_SCORE +
    creature.plantsEaten * PLANT_SCORE
  )
}

export const getPopulationScore = createSelector(getCreatures, (creatures) =>
  creatures.reduce((acc, creature) => acc + getCreatureScore(creature), 0)
)

function getWouldEatPlant(state: BoardState, id: number) {
  return getWouldEatObject(
    getCreatures(state)[id],
    getPlants(state).filter((plant) => plant.diedAt === null)
  )
}

function getWouldEatCreature(state: BoardState, id: number) {
  const creatures = getCreatures(state)

  return getWouldEatObject(
    creatures[id],
    creatures.filter(
      (creature) => creature.diedAt === null && creature.id !== id
    )
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
