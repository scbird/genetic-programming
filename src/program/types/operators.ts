import { AnyAction } from 'redux'
import { BoardState } from './BoardState'

export type Node = OperatorNode | TerminalNode

export interface OperatorNode {
  type: 'operator'
  func: string
  parameters: Node[]
}

export interface TerminalNode {
  type: 'terminal'
  value: number
}

export interface Operator {
  parameters: number
  func: OperatorFunction
  likelihood?: number
  type: OperatorType
}

export enum OperatorType {
  ACTION = 'action',
  PERCEPTION = 'percention',
  ARITHMETIC = 'arithmetic',
  LOGIC = 'logic'
}

export type OperatorFunction<Result extends number | boolean = number> = (
  state: BoardState,
  id: number,
  requestAction: (action: AnyAction) => 0
) => (...parameters: (() => number)[]) => Result
