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

export function getTicksPerRun(state: BoardState): number {
  return state.ticksPerRun
}

export function getRunsPerGeneration(state: BoardState): number {
  return state.runsPerGeneration
}

export function getTick(state: BoardState): number {
  return state.tick
}

export function getRun(state: BoardState): number {
  return state.run
}

export function getGeneration(state: BoardState): number {
  return state.generation
}

export function getCreatures(state: BoardState): readonly Creature[] {
  return state.creatures
}

export function getGenerationCreatures(state: BoardState): readonly Creature[] {
  return state.generations[state.generation].creatures
}

export function getPlants(state: BoardState): readonly Plant[] {
  return state.plants
}

export function getGenerationPlants(state: BoardState): readonly Plant[] {
  return state.generations[state.generation].plants
}
