import { Creature } from './Creature'
import { Dimension } from './Dimension'
import { Generation } from './Generation'
import { Plant } from './Plant'
import { UiState } from './UiState'

export interface BoardState {
  generation: number
  tick: number
  run: number
  ticksPerRun: number
  runsPerGeneration: number
  creatures: readonly Creature[]
  plants: readonly Plant[]
  boardSize: Dimension
  plantRestoreDelay: number
  creatureRestoreDelay: number
  numPlants: number
  numCreatures: number
  generations: readonly Generation[]
  training: boolean
  running: boolean
  // These are strings so that the user can enter the decimal point
  survivalRate: string
  mutationRate: string
  ui: UiState
}
