import { generateValue } from '../gp'
import { operators } from '../operators'
import { OperatorNode, TerminalNode } from '../types'
import { Mutator } from './types'

export const point: () => Mutator = () => mutateNode

const mutateNode: Mutator = (node, mutationRate) => {
  if (Math.random() <= mutationRate) {
    if (node.type === 'terminal') {
      mutateTerminal(node)
    } else {
      mutateOperator(node)
    }
  }

  if (node.type === 'operator') {
    node.parameters.forEach((parameter) => mutateNode(parameter, mutationRate))
  }

  return node
}

function mutateTerminal(node: TerminalNode) {
  node.value = generateValue()
}

function mutateOperator(node: OperatorNode) {
  const validOperators = Object.entries(operators)
    .filter(([_, { parameters }]) => parameters === node.parameters.length)
    .map(([name]) => name)

  node.func = validOperators[Math.floor(Math.random() * validOperators.length)]
}
