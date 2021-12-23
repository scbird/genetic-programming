import { OperatorFunction } from '../types'

export const ifFunc: OperatorFunction = () => (
  condition,
  trueValue,
  falseValue
) => (condition() ? trueValue() : falseValue())
