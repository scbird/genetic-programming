import { AnyAction } from 'redux'
import { Point } from './Point'

export interface Creature {
  type: 'creature'
  id: number
  expression: string
  diedAt: number | null
  location: Point
  heading: number
  requestedAction: AnyAction | null
  creaturesEaten: number
  plantsEaten: number
}
