import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '../reducers'
import { initialState } from '../reducers/board'
import { getCreatures, getCreatureScore } from '../selectors'
import { step } from './board'

describe('Board actions', () => {
  it('Should run a simulation', () => {
    const store = createStore(
      reducer,
      {
        ...initialState,
        numPlants: 20,
        numCreatures: 20,
        boardSize: { width: 10, height: 10 }
      },
      applyMiddleware(thunk)
    )

    while (store.getState().generation < 200) {
      const lastState = store.getState()
      store.dispatch(step() as any)

      const state = store.getState()

      if (state.tick === state.ticksPerGeneration) {
        console.log(
          state.generation,
          state.tick,
          getCreatures(state).reduce(
            (acc, creature) => acc + getCreatureScore(creature),
            0
          )
        )
      }
    }

    expect(
      Math.max(
        ...getCreatures(store.getState()).map((creature) =>
          getCreatureScore(creature)
        )
      )
    ).toBeGreaterThan(0)
  })
})
