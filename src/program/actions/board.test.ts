import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '../reducers'
import { initialState } from '../reducers/board'
import { getCreatures, getCreatureScore } from '../selectors'
import { trainNextGeneration } from './train'

describe('Board actions', () => {
  it('Should run a simulation', () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk))

    for (let i = 0; i < 5; i++) {
      store.dispatch(trainNextGeneration() as any)
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
