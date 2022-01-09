import { Creature } from './Creature'
import { Plant } from './Plant'

export interface Generation {
  creatures: Creature[]
  plants: Plant[]
  tick: number
  totalScore: number
}
