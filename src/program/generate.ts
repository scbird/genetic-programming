import { operators } from './operators'
import { Node, Operator, OperatorNode, TerminalNode } from './types'

const MAX_DEPTH = 20
const TERMINAL_RANGE = 5
const VALUE_DP = 3

export function generate(depth = 0, maxDepth = MAX_DEPTH): Node {
  if (Math.random() < getOperatorProbability(depth, maxDepth)) {
    return generateOperator(depth)
  } else {
    return generateTerminal()
  }
}

export function generateValue(): number {
  return (
    Math.round(
      TERMINAL_RANGE * ((Math.random() - 0.5) * 2) * Math.pow(10, VALUE_DP)
    ) / Math.pow(10, VALUE_DP)
  )
}

function getOperatorProbability(depth: number, maxDepth: number) {
  return 1 - depth / maxDepth
}

function generateTerminal(): TerminalNode {
  return {
    type: 'terminal',
    value: generateValue()
  }
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
