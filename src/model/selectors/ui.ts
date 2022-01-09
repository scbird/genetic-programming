import { BoardState } from '../types'

export function isPaused(state: BoardState): boolean {
  return state.ui.paused
}

export function getSelectedCreatureId(state: BoardState): number | undefined {
  return state.ui.selectedCreatureId
}
