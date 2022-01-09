import { eat } from '../actions'
import { BoardState, Creature, Plant } from '../types'
import { plantsReducer } from './plant'

describe('Plant reducer', () => {
  const initialState = {
    creatures: [
      { id: 0, diedAt: null },
      { id: 1, diedAt: null }
    ],
    plants: [
      { id: 0, diedAt: null },
      { id: 1, diedAt: null }
    ],
    tick: 3
  } as BoardState

  test('Plants should die when eaten', () => {
    const state = plantsReducer(initialState, eat(1, 'plant', 0))

    expect(state.plants[0].diedAt).toBe(initialState.tick)
    expect(state.plants[1].diedAt).toBe(null)
  })

  test('Plants should not die when eating a creature with the same ID', () => {
    const state = plantsReducer(initialState, eat(1, 'creature', 0))

    expect(state.plants[0].diedAt).toBe(null)
  })

  test('Plants should not die if already dead', () => {
    const plant = { id: 0, diedAt: 2 } as Plant
    const state = plantsReducer(
      { ...initialState, plants: [plant] },
      eat(1, 'plant', 0)
    )

    expect(state.plants[0].diedAt).toBe(plant.diedAt)
  })

  test("Plants should not die when eaten by a creature that's dead", () => {
    const creature = { id: 0, diedAt: initialState.tick } as Creature
    const state = plantsReducer(
      { ...initialState, creatures: [creature] },
      eat(0, 'plant', 0)
    )

    expect(state.plants[0].diedAt).toBe(null)
  })
})
