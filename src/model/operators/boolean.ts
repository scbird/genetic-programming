import { OperatorFunction } from '../types'

export const eq = toBool(() => (a, b) => a() === b())
export const neq = toBool(() => (a, b) => a() !== b())
export const gt = toBool(() => (a, b) => a() > b())
export const lt = toBool(() => (a, b) => a() < b())
export const gte = toBool(() => (a, b) => a() >= b())
export const lte = toBool(() => (a, b) => a() <= b())
export const and = toBool(() => (a, b) => a() && b())
export const or = toBool(() => (a, b) => a() || b())
export const not = toBool(() => (a) => !a())

export function toBool(
  func: OperatorFunction<number | boolean>
): OperatorFunction {
  return (state, id, requestAction) => (...params) =>
    func(state, id, requestAction)(...params) ? 1 : 0
}
