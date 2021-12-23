import { AnyAction } from 'redux'
import { eat } from './actions'
import { compile } from './compile'
import { parse } from './parse'
import { BoardState } from './types'
import { getDistance } from './util'

describe('compile', () => {
  it('should support simple compilation', () => {
    const node = parse('add(4, mult(6, 2))')
    const compiled = compile(node)
    const getResult = compiled(
      {} as BoardState,
      0,
      () => 0,
      () => false
    )

    expect(getResult()).toBe(16)
  })

  it('should correctly send the board state, id', () => {
    const node = parse('add(4, closestCreatureDistance())')
    const compiled = compile(node)
    const state = {
      creatures: [
        {
          id: 0,
          location: { x: 5, y: 10 }
        },
        {
          id: 1,
          location: { x: 50, y: 40 }
        },
        {
          id: 2,
          location: { x: 60, y: 70 }
        }
      ]
    } as BoardState
    const getResult = compiled(
      state,
      1,
      () => 0,
      () => false
    )

    expect(getResult()).toBe(
      4 + getDistance(state.creatures[1], state.creatures[2])
    )
  })

  it('should only evaluate required parts of the tree', () => {
    const node = parse('if(4, eat(), turn(30))')
    const compiled = compile(node)
    const state = {} as BoardState
    const requestedActions: AnyAction[] = []
    const getResult = compiled(
      state,
      1,
      (action) => {
        requestedActions.push(action)
        return 0
      },
      () => false
    )

    expect(getResult()).toBe(0)
    expect(requestedActions).toEqual([eat(1)])
  })

  it('should halt evaluations once an action is performed', () => {
    const node = parse('add(eat(), turn(30))')
    const compiled = compile(node)
    const state = {} as BoardState
    const requestedActions: AnyAction[] = []
    const getResult = compiled(
      state,
      1,
      (action) => {
        requestedActions.push(action)
        return 0
      },
      () => requestedActions.length > 0
    )

    expect(getResult()).toBe(0)
    expect(requestedActions).toEqual([eat(1)])
  })
})
