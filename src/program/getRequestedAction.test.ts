import { eat } from './actions'
import { getRequestedAction } from './getRequestedAction'
import { BoardState } from './types'

describe('getRequestedAction', () => {
  test.each([
    ['add(3, 4)', null],
    ['eat()', eat(0, 'creature', 1)]
  ])('getRequestedAction(%p)', (expression, expected) => {
    const state = {
      creatures: [
        {
          id: 0,
          type: 'creature',
          expression,
          location: { x: 0, y: 0 },
          heading: Math.PI / 2
        },
        {
          id: 1,
          type: 'creature',
          expression: '3',
          location: { x: 0, y: 0.5 },
          heading: Math.PI / 2
        }
      ]
    } as BoardState

    expect(getRequestedAction(state, 0)).toEqual(expected)
  })
})
