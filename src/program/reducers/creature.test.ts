import { eat } from '../actions'
import { BoardState } from '../types'
import { creaturesReducer } from './creature'

describe('Creature reducer', () => {
  const initialState = {
    creatures: [
      {
        id: 0,
        type: 'creature',
        diedAt: null,
        creaturesEaten: 2,
        plantsEaten: 4
      },
      {
        id: 1,
        type: 'creature',
        diedAt: null,
        creaturesEaten: 6,
        plantsEaten: 8
      }
    ],
    plants: [
      { id: 0, type: 'plant', diedAt: null },
      { id: 1, type: 'plant', diedAt: null }
    ],
    tick: 3
  } as BoardState

  test('Creatures should die when eaten', () => {
    const state = creaturesReducer(initialState, eat(1, 'creature', 0))

    expect(state.creatures).toMatchObject([
      {
        diedAt: initialState.tick,
        creaturesEaten: initialState.creatures[0].creaturesEaten,
        plantsEaten: initialState.creatures[0].plantsEaten
      },
      {
        diedAt: null,
        creaturesEaten: initialState.creatures[1].creaturesEaten + 1,
        plantsEaten: initialState.creatures[1].plantsEaten
      }
    ])
  })

  test('Creatures should not die when eating a plant with the same ID', () => {
    const state = creaturesReducer(initialState, eat(1, 'plant', 0))

    expect(state.creatures).toMatchObject([
      {
        diedAt: null,
        creaturesEaten: initialState.creatures[0].creaturesEaten,
        plantsEaten: initialState.creatures[0].plantsEaten
      },
      {
        diedAt: null,
        creaturesEaten: initialState.creatures[1].creaturesEaten,
        plantsEaten: initialState.creatures[1].plantsEaten + 1
      }
    ])
  })

  test('Creatures should not die if already dead', () => {
    const creature = { ...initialState.creatures[0], diedAt: 2 }
    const state = creaturesReducer(
      { ...initialState, creatures: [creature, initialState.creatures[1]] },
      eat(1, 'creature', 0)
    )

    expect(state.creatures[0].diedAt).toBe(creature.diedAt)
    expect(state.creatures[1].creaturesEaten).toBe(
      initialState.creatures[1].creaturesEaten
    )
  })

  test("Creatures should not die when eaten by a creature that's dead", () => {
    const creature = { ...initialState.creatures[1], diedAt: initialState.tick }
    const state = creaturesReducer(
      { ...initialState, creatures: [initialState.creatures[0], creature] },
      eat(1, 'creature', 0)
    )

    expect(state.creatures[0].diedAt).toBe(null)
    expect(state.creatures[1].creaturesEaten).toBe(
      initialState.creatures[1].creaturesEaten
    )
  })

  test('Creatures should not eat themselves', () => {
    const state = creaturesReducer(initialState, eat(0, 'creature', 0))

    expect(state.creatures[0].diedAt).toBe(null)
    expect(state.creatures[0].creaturesEaten).toBe(
      initialState.creatures[0].creaturesEaten
    )
  })
})
