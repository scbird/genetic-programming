import { operators } from './operators'
import { Node, Operator, OperatorNode, TerminalNode } from './types/types'

const MAX_DEPTH = 20
const TERMINAL_RANGE = 5

export function generate(depth = 0): Node {
  if (Math.random() < getOperatorProbability(depth)) {
    return generateOperator(depth)
  } else {
    return generateTerminal()
  }
}

function getOperatorProbability(depth: number) {
  return 1 - depth / MAX_DEPTH
}

function generateTerminal(): TerminalNode {
  return { type: 'terminal', value: TERMINAL_RANGE * (Math.random() * 2 - 1) }
}

function generateOperator(depth: number): OperatorNode {
  const operatorName = chooseOperator()
  const operator = operators[operatorName]
  const parameters: Node[] = []

  for (let i = 0; i < operator.parameters; i++) {
    parameters[i] = generate(depth + 1)
  }

  return { type: 'operator', func: operatorName, parameters }
}

function chooseOperator(): string {
  const totalLikelihood = Object.entries(operators).reduce(
    (acc, [_, operator]) => acc + getLikelihood(operator),
    0
  )
  let remaining = Math.random() * totalLikelihood

  return Object.entries(operators).find(([_, operator]) => {
    const likelihood = getLikelihood(operator)

    if (likelihood >= remaining) {
      return true
    } else {
      remaining -= likelihood
      return false
    }
  })![0]
}

function getLikelihood(operator: Operator): number {
  return operator.likelihood ?? 1
}
