import { Point } from './Point'

export interface Plant {
  type: 'plant'
  id: number
  location: Point
  diedAt: number | null
}
