import { AnyAction } from 'redux'
import { Point } from './Point'

export interface Creature {
  type: 'creature'
  id: number
  expression: string
  diedAt: number | null
  location: Point
  /** Which way the creature is facing. In the range of [-PI, PI), 0 means pointing east */
  heading: number
  requestedAction: AnyAction | null
  creaturesEaten: number
  plantsEaten: number
}
