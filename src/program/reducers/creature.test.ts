import { eat } from '../actions'
import { BoardState, Creature } from '../types'
import { creaturesReducer } from './creature'

describe('Creature reducer', () => {
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

  test('Creatures should die when eaten', () => {
    const state = creaturesReducer(initialState, eat(1, 'creature', 0))

    expect(state.creatures[0].diedAt).toBe(initialState.tick)
    expect(state.creatures[1].diedAt).toBe(null)
  })

  test('Creatures should not die when eating a plant with the same ID', () => {
    const state = creaturesReducer(initialState, eat(1, 'plant', 0))

    expect(state.creatures[0].diedAt).toBe(null)
  })

  test('Creatures should not die if already dead', () => {
    const creature = { id: 0, diedAt: 2 } as Creature
    const state = creaturesReducer(
      { ...initialState, creatures: [creature, initialState.creatures[1]] },
      eat(1, 'creature', 0)
    )

    expect(state.creatures[0].diedAt).toBe(creature.diedAt)
  })

  test("Creatures should not die when eaten by a creature that's dead", () => {
    const creature = { id: 0, diedAt: initialState.tick } as Creature
    const state = creaturesReducer(
      { ...initialState, creatures: [creature, initialState.creatures[1]] },
      eat(0, 'creature', 1)
    )

    expect(state.creatures[1].diedAt).toBe(null)
  })

  test('Creatures should not eat themselves', () => {
    const state = creaturesReducer(initialState, eat(0, 'creature', 0))

    expect(state.creatures[0].diedAt).toBe(null)
  })
})
