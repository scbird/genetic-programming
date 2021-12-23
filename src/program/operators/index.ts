import { Operator } from '../types'
import { add, div, mult, sub } from './arithmetic'
import { and, eq, gt, gte, lt, lte, neq, not, or } from './boolean'
import { ifFunc } from './if'
import {
  canEat,
  closestCreatureAngle,
  closestCreatureDistance,
  closestFoodAngle,
  closestFoodDistance,
  closestPlantAngle,
  closestPlantDistance
} from './state'
import { eat, turn, move } from './actions'

const ACTION_LIKELIHOOD = 0.1

export const operators: Record<string, Operator> = {
  add: { parameters: 2, func: add },
  sub: { parameters: 2, func: sub },
  div: { parameters: 2, func: div },
  mult: { parameters: 2, func: mult },

  and: { parameters: 2, func: and },
  or: { parameters: 2, func: or },
  not: { parameters: 1, func: not },

  lt: { parameters: 2, func: lt },
  lte: { parameters: 2, func: lte },
  eq: { parameters: 2, func: eq },
  neq: { parameters: 2, func: neq },
  gte: { parameters: 2, func: gte },
  gt: { parameters: 2, func: gt },

  if: { parameters: 3, func: ifFunc },

  closestFoodDistance: { parameters: 0, func: closestFoodDistance },
  closestFoodAngle: { parameters: 0, func: closestFoodAngle },
  closestPlantDistance: { parameters: 0, func: closestPlantDistance },
  closestPlantAngle: { parameters: 0, func: closestPlantAngle },
  closestCreatureDistance: { parameters: 0, func: closestCreatureDistance },
  closestCreatureAngle: { parameters: 0, func: closestCreatureAngle },
  canEat: { parameters: 0, func: canEat },

  eat: { parameters: 0, func: eat, likelihood: ACTION_LIKELIHOOD },
  turn: { parameters: 1, func: turn, likelihood: ACTION_LIKELIHOOD },
  move: { parameters: 1, func: move, likelihood: ACTION_LIKELIHOOD }
}
