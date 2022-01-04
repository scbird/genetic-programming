import { BoardState, Point } from '../types'

export function getRandomLocation(state: BoardState): Point {
  return {
    x: Math.random() * state.boardSize.width,
    y: Math.random() * state.boardSize.height
  }
}

export function getRandomHeading() {
  return (Math.random() - 0.5) * Math.PI * 2
}
