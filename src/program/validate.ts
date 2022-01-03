import { operators } from './operators'
import { Node, OperatorNode, TerminalNode } from './types'

export function validate(node: Node) {
  if (node.type === 'terminal') {
    validateTerminal(node)
  } else {
    validateOperator(node)
  }
}

function validateTerminal(node: TerminalNode) {
  if (isNaN(node.value)) {
    throw new Error('Invalid terminal node')
  }
}

function validateOperator(node: OperatorNode) {
  if (!operators[node.func]) {
    throw new Error(`Unknown function ${node.func}`)
  } else if (node.parameters.length !== operators[node.func].parameters) {
    throw new Error(
      `Invalid number of parameters for function ${node.func}; expected ${
        operators[node.func].parameters
      }, got ${node.parameters.length}`
    )
  } else {
    node.parameters.forEach(validate)
  }
}
