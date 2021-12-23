import {
  getClosestCreatureAngle,
  getClosestCreatureDistance,
  getClosestPlantAngle,
  getClosestPlantDistance,
  getWouldEat
} from '../selectors'
import { OperatorFunction } from '../types'
import { toBool } from './boolean'

export const closestCreatureDistance: OperatorFunction = (state, id) => () =>
  getClosestCreatureDistance(state, id)
export const closestCreatureAngle: OperatorFunction = (state, id) => () =>
  getClosestCreatureAngle(state, id)

export const closestPlantDistance: OperatorFunction = (state, id) => () =>
  getClosestPlantDistance(state, id)
export const closestPlantAngle: OperatorFunction = (state, id) => () =>
  getClosestPlantAngle(state, id)

export const closestFoodDistance: OperatorFunction = (state, id) => () =>
  Math.min(
    getClosestPlantDistance(state, id),
    getClosestCreatureDistance(state, id)
  )
export const closestFoodAngle: OperatorFunction = (state, id) => () => {
  const closestPlantDistance = getClosestPlantDistance(state, id)
  const closestCreatureDistance = getClosestCreatureDistance(state, id)

  if (closestCreatureDistance < closestPlantDistance) {
    return getClosestCreatureAngle(state, id)
  } else {
    return getClosestPlantAngle(state, id)
  }
}

export const canEat: OperatorFunction = toBool((state, id) => () => {
  return getWouldEat(state, id) !== null
})
