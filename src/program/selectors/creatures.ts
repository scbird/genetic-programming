import { AnyAction } from 'redux'
import { createSelector } from 'reselect'
import { getRequestedAction } from '../getRequestedAction'
import { BoardState, Creature, Plant } from '../types'
import {
  getDistance,
  getHeading,
  getRelativeAngle,
  normalizeHeading
} from '../util'
import { getCreatures, getPlants } from './board'

const MAX_EAT_DISTANCE = 1
const MAX_EAT_ANGLE = Math.PI / 4
const PLANT_SCORE = 1
const CREATURE_SCORE = 5

const getDistanceFromCreature = createSelector(getCreatures, (creatures) => {
  const distances: Record<string, number> = {}

  return (creatureId: number, object: Creature | Plant): number => {
    const key =
      creatureId < object.id
        ? `${object.type}:${creatureId}:${object.id}`
        : `${object.type}:${object.id}:${creatureId}`

    if (distances[key] === undefined) {
      distances[key] = getDistance(creatures[creatureId], object)
    }

    return distances[key]
  }
})

export function getClosestCreatureDistance(
  state: BoardState,
  id: number
): number {
  const closestCreature = getClosestCreatureTo(state)(id)

  return closestCreature
    ? getDistanceFromCreature(state)(id, closestCreature)
    : Infinity
}

export function getClosestCreatureAngle(state: BoardState, id: number): number {
  const creature = getCreatures(state)[id]
  const closestCreature = getClosestCreatureTo(state)(id)

  if (closestCreature) {
    const headingToClosest = getHeading(creature, closestCreature)

    return getRelativeAngle(creature.heading, headingToClosest)
  } else {
    return 0
  }
}

export function getClosestPlantDistance(state: BoardState, id: number): number {
  const closestPlant = getClosestPlantTo(state)(id)

  return closestPlant
    ? getDistanceFromCreature(state)(id, closestPlant)
    : Infinity
}

export function getClosestPlantAngle(state: BoardState, id: number): number {
  const creature = getCreatures(state)[id]
  const closestPlant = getClosestPlantTo(state)(id)

  if (closestPlant) {
    const headingToClosest = getHeading(creature, closestPlant)

    return getRelativeAngle(creature.heading, headingToClosest)
  } else {
    return 0
  }
}

export function getCreatureExpression(state: BoardState, id: number): string {
  return getCreatures(state)[id].expression
}

export function getWouldEat(
  state: BoardState,
  id: number
): Creature | Plant | null {
  return getWouldEatCreature(state)(id) ?? getWouldEatPlant(state)(id)
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

const getClosestCreatureTo = createSelector(
  getDistanceFromCreature,
  getCreatures,
  (distanceFromCreature, creatures) => {
    const closestTo: Record<number, Creature> = {}

    return (id: number): Creature | null => {
      if (!closestTo[id]) {
        const eligableCreatures = creatures.filter(
          (creature) => isAlive(creature) && creature.id !== id
        )
        const distances = eligableCreatures.map((creature) =>
          distanceFromCreature(id, creature)
        )
        const minDistance = Math.min(...distances)
        const closestIdx = distances.findIndex(
          (distance) => distance === minDistance
        )

        closestTo[id] = eligableCreatures[closestIdx] ?? null
      }

      return closestTo[id]
    }
  }
)

const getClosestPlantTo = createSelector(
  getDistanceFromCreature,
  getCreatures,
  getPlants,
  (distanceFromCreature, creatures, plants) => {
    const closestTo: Record<number, Plant> = {}
    const eligablePlants = plants.filter(isAlive)

    return (id: number): Plant | null => {
      if (!closestTo[id]) {
        const distances = eligablePlants.map((plant) =>
          distanceFromCreature(id, plant)
        )
        const minDistance = Math.min(...distances)
        const closestIdx = distances.findIndex(
          (distance) => distance === minDistance
        )

        closestTo[id] = eligablePlants[closestIdx] ?? null
      }

      return closestTo[id]
    }
  }
)

const getWouldEatObject = createSelector(
  getDistanceFromCreature,
  (distanceFromCreature) => <T extends Creature | Plant>(
    creature: Creature,
    objects: readonly T[]
  ) => {
    const objectDistances = objects
      .map(
        (curr) => [curr, distanceFromCreature(creature.id, curr)] as [T, number]
      )
      .filter(([curr, distance]) => {
        const headingToObject = getHeading(creature, curr)
        const angleToObject = normalizeHeading(
          creature.heading - headingToObject
        )

        return (
          distance <= MAX_EAT_DISTANCE &&
          Math.abs(angleToObject) <= MAX_EAT_ANGLE
        )
      })
      .sort((a, b) => a[1] - b[1])

    return objectDistances[0]?.[0] ?? null
  }
)

const getWouldEatPlant = createSelector(
  getCreatures,
  getPlants,
  getWouldEatObject,
  (creatures, plants, wouldEatObject) => (id: number) => {
    const creature = creatures[id]

    return wouldEatObject(creature, plants.filter(isAlive))
  }
)

const getWouldEatCreature = createSelector(
  getCreatures,
  getWouldEatObject,
  (creatures, wouldEatObject) => (id: number) => {
    const creature = creatures[id]

    return wouldEatObject(
      creature,
      creatures.filter(
        (otherCreature) => otherCreature !== creature && isAlive(otherCreature)
      )
    )
  }
)

function isAlive(object: Creature | Plant): boolean {
  return object.diedAt === null
}
