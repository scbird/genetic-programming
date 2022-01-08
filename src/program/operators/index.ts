import { Operator, OperatorType } from '../types'
import { eat, move, turn } from './actions'
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

const ACTION_LIKELIHOOD = 0.1

export const operators: Record<string, Operator> = {
  add: { parameters: 2, func: add, type: OperatorType.ARITHMETIC },
  sub: { parameters: 2, func: sub, type: OperatorType.ARITHMETIC },
  div: { parameters: 2, func: div, type: OperatorType.ARITHMETIC },
  mult: { parameters: 2, func: mult, type: OperatorType.ARITHMETIC },

  lt: { parameters: 2, func: lt, type: OperatorType.ARITHMETIC },
  lte: { parameters: 2, func: lte, type: OperatorType.ARITHMETIC },
  eq: { parameters: 2, func: eq, type: OperatorType.ARITHMETIC },
  neq: { parameters: 2, func: neq, type: OperatorType.ARITHMETIC },
  gte: { parameters: 2, func: gte, type: OperatorType.ARITHMETIC },
  gt: { parameters: 2, func: gt, type: OperatorType.ARITHMETIC },

  if: { parameters: 3, func: ifFunc, type: OperatorType.LOGIC },
  and: { parameters: 2, func: and, type: OperatorType.LOGIC },
  or: { parameters: 2, func: or, type: OperatorType.LOGIC },
  not: { parameters: 1, func: not, type: OperatorType.LOGIC },

  closestFoodDistance: {
    parameters: 0,
    func: closestFoodDistance,
    type: OperatorType.PERCEPTION
  },
  closestFoodAngle: {
    parameters: 0,
    func: closestFoodAngle,
    type: OperatorType.PERCEPTION
  },
  closestPlantDistance: {
    parameters: 0,
    func: closestPlantDistance,
    type: OperatorType.PERCEPTION
  },
  closestPlantAngle: {
    parameters: 0,
    func: closestPlantAngle,
    type: OperatorType.PERCEPTION
  },
  closestCreatureDistance: {
    parameters: 0,
    func: closestCreatureDistance,
    type: OperatorType.PERCEPTION
  },
  closestCreatureAngle: {
    parameters: 0,
    func: closestCreatureAngle,
    type: OperatorType.PERCEPTION
  },
  canEat: {
    parameters: 0,
    func: canEat,
    type: OperatorType.PERCEPTION
  },

  eat: {
    parameters: 0,
    func: eat,
    likelihood: ACTION_LIKELIHOOD,
    type: OperatorType.ACTION
  },
  turn: {
    parameters: 1,
    func: turn,
    likelihood: ACTION_LIKELIHOOD,
    type: OperatorType.ACTION
  },
  move: {
    parameters: 1,
    func: move,
    likelihood: ACTION_LIKELIHOOD,
    type: OperatorType.ACTION
  }
}
