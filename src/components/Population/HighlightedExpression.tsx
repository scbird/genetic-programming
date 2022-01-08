import React, { CSSProperties, FC } from 'react'
import { operators } from '../../program/operators'
import { parse } from '../../program/parse'
import {
  Node,
  OperatorNode,
  OperatorType,
  TerminalNode
} from '../../program/types'

export interface HighlightedExpressionProps {
  expression: string
}

export const HighlightedExpression: FC<HighlightedExpressionProps> = ({
  expression
}) => {
  const root = parse(expression)

  return <RenderedNode node={root} />
}

const RenderedNode: FC<{ node: Node }> = ({ node }) => {
  if (node.type === 'terminal') {
    return <RenderedTerminalNode node={node} />
  } else {
    return <RenderedOperatorNode node={node} />
  }
}

const RenderedTerminalNode: FC<{ node: TerminalNode }> = ({ node }) => {
  return <span style={getStyle(node)}>{node.value}</span>
}

const RenderedOperatorNode: FC<{ node: OperatorNode }> = ({ node }) => {
  return (
    <span style={{ color: DEFAULT_COLOR }}>
      <span style={getStyle(node)}>{node.func}</span>(
      {node.parameters.map((parameter, idx) => {
        return (
          <>
            {idx > 0 ? ', ' : undefined}
            <RenderedNode node={parameter} />
          </>
        )
      })}
      )
    </span>
  )
}

const DEFAULT_COLOR = '#333333'
const STYLES: Record<OperatorType | 'terminal', CSSProperties> = {
  [OperatorType.ACTION]: { fontWeight: 'bold', color: '#bb3333' },
  [OperatorType.PERCEPTION]: { color: '#333399' },
  [OperatorType.LOGIC]: {},
  [OperatorType.ARITHMETIC]: {},
  terminal: { color: '#339933' }
}

function getStyle(node: Node): CSSProperties {
  if (node.type === 'terminal') {
    return STYLES.terminal
  } else {
    return STYLES[operators[node.func].type]
  }
}
