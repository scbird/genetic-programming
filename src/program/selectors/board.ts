import { BoardState, Creature, Dimension, Plant } from '../types'

export function getNumCreatures(state: BoardState): number {
  return state.numCreatures
}

export function getNumPlants(state: BoardState): number {
  return state.numPlants
}

export function getBoardSize(state: BoardState): Dimension {
  return state.boardSize
}

export function getTicksPerGeneration(state: BoardState): number {
  return state.ticksPerGeneration
}

export function getTick(state: BoardState): number {
  return state.tick
}

export function getGeneration(state: BoardState): number {
  return state.generation
}

export function getCreatures(state: BoardState): readonly Creature[] {
  return state.creatures
}

export function getPlants(state: BoardState): readonly Plant[] {
  return state.plants
}
