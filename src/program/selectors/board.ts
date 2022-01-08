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

export function getPlants(state: BoardState): readonly Plant[] {
  return state.plants
}

export function isRunning(state: BoardState): boolean {
  return state.running
}

export function getSurvivalRate(state: BoardState): number {
  return toNumber(state.survivalRate)
}

export function getRawSurvivalRate(state: BoardState): string {
  return state.survivalRate
}

export function getMutationRate(state: BoardState): number {
  return toNumber(state.mutationRate)
}

export function getRawMutationRate(state: BoardState): string {
  return state.mutationRate
}

function toNumber(number: string): number {
  return +number.replace(/\.$/, '')
}
