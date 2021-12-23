import { BoardState, Creature, Plant } from '../types'

export function getCreatures(state: BoardState): readonly Creature[] {
  return state.creatures
}

export function getPlants(state: BoardState): readonly Plant[] {
  return state.plants
}
