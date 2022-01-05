import { Creature } from './Creature'
import { Dimension } from './Dimension'
import { Generation } from './Generation'
import { Plant } from './Plant'

export interface BoardState {
  generation: number
  tick: number
  ticksPerGeneration: number
  creatures: readonly Creature[]
  plants: readonly Plant[]
  boardSize: Dimension
  plantRestoreDelay: number
  creatureRestoreDelay: number
  numPlants: number
  numCreatures: number
  generations: readonly Generation[]
  training: boolean
}
