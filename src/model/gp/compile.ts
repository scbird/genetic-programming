import { AnyAction } from 'redux'
import { operators } from '../operators'
import { BoardState, Node, OperatorNode, TerminalNode } from '../types'

export function compile(
  node: Node
): (
  state: BoardState,
  id: number,
  requestAction: (action: AnyAction) => 0,
  isActionRequested: () => boolean
) => () => number {
  if (node.type === 'terminal') {
    return compileTerminal(node)
  } else {
    return compileOperator(node)
  }
}

function compileTerminal(node: TerminalNode): () => () => number {
  return () => () => node.value
}

function compileOperator(
  node: OperatorNode
): (
  state: BoardState,
  id: number,
  requestAction: (action: AnyAction) => 0,
  isActionRequested: () => boolean
) => () => number {
  const func = operators[node.func].func

  return (state, id, requestAction, isActionRequested) => {
    const parameterFuncs = node.parameters.map((parameterNode) => {
      // In standard usage, the function will be only run once, and
      // we use short-circuit evaulation, meaning that we can achieve a
      // simple optimisation by only compiling the parts of the tree we
      // actually need
      return () => {
        if (!isActionRequested()) {
          return compile(parameterNode)(
            state,
            id,
            requestAction,
            isActionRequested
          )()
        } else {
          return 0
        }
      }
    })

    return () => func(state, id, requestAction)(...parameterFuncs)
  }
}
