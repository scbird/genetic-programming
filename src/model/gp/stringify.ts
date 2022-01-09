import { Node, OperatorNode, TerminalNode } from '../types'

export function stringify(node: Node): string {
  if (node.type === 'terminal') {
    return stringifyTerminal(node)
  } else {
    return stringifyOperator(node)
  }
}

function stringifyTerminal(node: TerminalNode): string {
  return String(node.value)
}

function stringifyOperator(node: OperatorNode): string {
  return `${node.func}(${node.parameters.map(stringify).join(', ')})`
}
