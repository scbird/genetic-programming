import { BoardState } from '../types'

export const initialState: BoardState = {
  boardSize: { width: 20, height: 20 },
  ticksPerRound: 100,
  tick: 0,
  creatures: [],
  plants: []
}
