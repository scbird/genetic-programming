import { Creature } from './Creature'
import { Plant } from './Plant'

export interface Generation {
  creatures: readonly Creature[]
  plants: readonly Plant[]
  tick: number
  totalScore: number
}
