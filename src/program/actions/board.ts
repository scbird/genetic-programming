import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getRequestedAction } from '../getRequestedAction'
import { getCreatures } from '../selectors'
import { BoardState } from '../types'

export const DEAD_RESTORE = 'DEAD_RESTORE'

export const restoreDeadPlantsAndCreatures = (): AnyAction => ({
  type: DEAD_RESTORE
})

export const step: () => ThunkAction<void, BoardState, any, any> = () => (
  dispatch
) => {
  dispatch(restoreDeadPlantsAndCreatures())
  dispatch(performCreatureActions())
}

const performCreatureActions: () => ThunkAction<
  void,
  BoardState,
  any,
  any
> = () => {
  return (dispatch, getState) => {
    const state = getState()
    const actions = getCreatures(state)
      .filter((creature) => creature.diedAt === null)
      .map((creature) => getRequestedAction(state, creature.id))
      .filter((action): action is AnyAction => action !== null)

    // Perform the actions in non-deterministic order, so that creatures with lower IDs don't
    // have an advantage over ones with higher IDs
    shuffle(actions)

    actions.forEach((action) => dispatch(action))
  }
}

function shuffle<T>(items: T[]) {
  for (let srcIdx = 0; srcIdx < items.length; srcIdx++) {
    const destIdx = Math.floor(Math.random() * items.length)
    const source = items[srcIdx]

    items[srcIdx] = items[destIdx]
    items[destIdx] = source
  }
}
