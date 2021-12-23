import { BoardState, Creature, Plant } from '../types'
import {
  getDistance,
  getHeading,
  getNearestTo,
  getRelativeAngle
} from '../util'
import { getCreatures, getPlants } from './board'

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
