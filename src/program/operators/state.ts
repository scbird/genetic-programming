import {
  getClosestCreatureAngle,
  getClosestCreatureDistance,
  getClosestPlantAngle,
  getClosestPlantDistance
} from '../selectors'
import { OperatorFunction } from '../types'
import { toBool } from './boolean'

const MAX_EAT_DISTANCE = 2
const MAX_EAT_ANGLE = Math.PI / 4

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

export const canEat: OperatorFunction = toBool(
  (state, id, requestAction) => () => {
    const distance = closestFoodDistance(state, id, requestAction)()
    const angle = closestFoodAngle(state, id, requestAction)()

    return distance <= MAX_EAT_DISTANCE && Math.abs(angle) <= MAX_EAT_ANGLE
  }
)
