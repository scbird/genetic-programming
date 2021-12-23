import { eat } from './actions'
import { getRequestedAction } from './getRequestedAction'
import { BoardState } from './types'

describe('getRequestedAction', () => {
  test.each([
    ['add(3, 4)', null],
    ['eat()', eat(0)]
  ])('getRequestedAction(%p)', (expression, expected) => {
    const state = { creatures: [{ id: 0, expression }] } as BoardState

    expect(getRequestedAction(state, 0)).toEqual(expected)
  })
})
