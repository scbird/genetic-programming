import { AnyAction } from 'redux'

export const CREATURE_EAT = 'CREATURE_EAT'
export const CREATURE_MOVE = 'CREATURE_MOVE'
export const CREATURE_TURN = 'CREATURE_TURN'

export const CREATURE_SET_REQUESTED_ACTIONS = 'CREATURE_SET_REQUESTED_ACTIONS'

export function eat(
  id: number,
  type: 'plant' | 'creature' | 'nothing',
  targetId: number
): AnyAction {
  return {
    type: CREATURE_EAT,
    payload: { id, type, targetId }
  }
}

export function move(id: number, distance: number): AnyAction {
  return {
    type: CREATURE_MOVE,
    payload: { id, distance }
  }
}

export function turn(id: number, angle: number): AnyAction {
  return {
    type: CREATURE_TURN,
    payload: { id, angle }
  }
}

export const setRequestedActions: (
  actionsById: Record<number, AnyAction | null>
) => AnyAction = (actionsById) => ({
  type: CREATURE_SET_REQUESTED_ACTIONS,
  payload: actionsById
})
