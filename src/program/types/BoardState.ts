import { Creature } from './Creature'
import { Dimension } from './Dimension'
import { Generation } from './Generation'
import { Plant } from './Plant'

export interface BoardState {
  generation: number
  tick: number
  ticksPerGeneration: number
  creatures: Creature[]
  plants: Plant[]
  boardSize: Dimension
  plantRestoreDelay: number
  creatureRestoreDelay: number
  numPlants: number
  numCreatures: number
  generations: Generation[]
  training: boolean
}
