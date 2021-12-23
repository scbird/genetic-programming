import { Creature } from './Creature'
import { Dimension } from './Dimension'
import { Plant } from './Plant'

export interface BoardState {
  tick: number
  ticksPerRound: number
  creatures: Creature[]
  plants: Plant[]
  boardSize: Dimension
}
