import { OperatorFunction } from '../types'

export const add: OperatorFunction = () => (a, b) => a() + b()
export const sub: OperatorFunction = () => (a, b) => a() - b()
export const mult: OperatorFunction = () => (a, b) => a() * b()
export const div: OperatorFunction = () => (a, b) => a() / b()
