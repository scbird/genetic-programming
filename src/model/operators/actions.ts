import {
  eat as eatAction,
  move as moveAction,
  turn as turnAction
} from '../actions'
import { getWouldEat } from '../selectors'
import { OperatorFunction } from '../types'

export const eat: OperatorFunction = (state, id, requestAction) => () => {
  const wouldEat = getWouldEat(state, id)

  if (wouldEat) {
    return requestAction(eatAction(id, wouldEat.type, wouldEat.id))
  } else {
    return requestAction(eatAction(id, 'nothing', 0))
  }
}

export const move: OperatorFunction = (state, id, requestAction) => (
  distance
) => {
  return requestAction(moveAction(id, distance()))
}

export const turn: OperatorFunction = (state, id, requestAction) => (angle) => {
  return requestAction(turnAction(id, angle()))
}
