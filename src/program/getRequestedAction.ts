import { AnyAction } from 'redux'
import { compile } from './compile'
import { parse } from './parse'
import { getCreatureExpression } from './selectors'
import { BoardState } from './types'

export function getRequestedAction(
  state: BoardState,
  id: number
): AnyAction | null {
  let action: AnyAction | null = null

  const expression = getCreatureExpression(state, id)
  const node = parse(expression)
  const func = compile(node)
  func(state, id, requestAction, isActionRequested)()

  return action

  function requestAction(requestedAction: AnyAction): 0 {
    if (!isActionRequested()) {
      action = requestedAction
    }

    return 0
  }

  function isActionRequested(): boolean {
    return !!action
  }
}
