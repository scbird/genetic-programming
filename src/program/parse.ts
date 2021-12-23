import { Node, OperatorNode, TerminalNode } from './types'

export function parse(expression: string): Node {
  let pos = 0

  return getNextNode()

  function getNextNode(): Node {
    const tokenParts = expression
      .substring(pos)
      .match(/^\s*(-?[0-9]+(:?\.[0-9]+)?|[a-z]+)\s*/i)

    if (!tokenParts) {
      throw new Error(
        `Program ${expression}: Unable to parse at position ${pos}, got ${expression.substring(
          pos
        )}`
      )
    }

    pos += tokenParts[0].length
    const token = tokenParts[1]

    if (/[a-z]/.test(token)) {
      return buildOperatorNode(token)
    } else {
      return buildTerminalNode(token)
    }
  }

  function buildOperatorNode(token: string): OperatorNode {
    if (expression[pos] !== '(') {
      throw new Error(
        `Program ${expression}: Expected "(" at position ${pos}, got ${token[pos]}`
      )
    }

    const parameters: Node[] = []

    do {
      // Skip over the "(" or ","
      pos++

      // Condition needed to handle functions with no arguments
      if (!/^\s*\)/.test(expression.substring(pos))) {
        parameters.push(getNextNode())
      }
    } while (expression[pos] === ',')

    if (expression[pos] !== ')') {
      throw new Error(
        `Program ${expression}: Expected ")" at position ${pos}, got ${token[pos]}`
      )
    }

    // Skip over the ")" and any whitespace that comes after (necessary to handle programs that have whitespace
    // between two closing brackets, eg "add(not(4) )")
    pos += expression.substring(pos).match(/^\)\s*/)![0].length

    return { type: 'operator', func: token, parameters }
  }

  function buildTerminalNode(token: string): TerminalNode {
    return { type: 'terminal', value: +token }
  }
}
