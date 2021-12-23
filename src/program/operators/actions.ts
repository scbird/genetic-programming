import {
  getClosestCreatureAngle,
  getClosestCreatureDistance,
  getClosestPlantDistance
} from '../selectors'
import { OperatorFunction } from '../types'
import {
  eat as eatAction,
  move as moveAction,
  turn as turnAction
} from '../actions'

const MAX_EAT_DISTANCE = 1
const MAX_EAT_ANGLE = Math.PI / 8

export const eat: OperatorFunction = (state, id, requestAction) => () => {
  const closestCreatureDistance = getClosestCreatureDistance(state, id)
  const closestCreatureAngle = getClosestCreatureAngle(state, id)

  if (
    Math.abs(closestCreatureAngle) <= MAX_EAT_ANGLE &&
    closestCreatureDistance <= MAX_EAT_DISTANCE
  ) {
    return
  }

  const closestCreatureAngle = getClosestCreatureAngle()

  const closestPlantDistance = getClosestPlantDistance(state, id)

  const closestPlantDistance = getClosestPlantDistance(state, id)

  return requestAction(eatAction(id))
}

export const move: OperatorFunction = (state, id, requestAction) => (
  distance
) => {
  return requestAction(moveAction(id, distance()))
}

export const turn: OperatorFunction = (state, id, requestAction) => (angle) => {
  return requestAction(turnAction(id, angle()))
}
