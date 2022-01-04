import { generate } from './generate'
import { Node, OperatorNode } from './types'

const MUTATION_RATE = 0.05

/**
 * Applies random mutations to the node
 */
export function mutate(
  root: Node,
  mutationRate = MUTATION_RATE,
  maxDepth?: number
): Node {
  // Flatten the tree so that each node has the same probability of being selected
  const parents: {
    node: OperatorNode | null
    parameter: number
    depth: number
  }[] = [{ node: null, parameter: 0, depth: 0 }]

  findParents(root, 0)
  const numMutations = Math.ceil(parents.length * mutationRate)

  for (let i = 0; i < numMutations; i++) {
    const mutationIdx = Math.floor(Math.random() * parents.length)
    const parent = parents[mutationIdx]

    if (parent.node === null) {
      // Special case - the root node has been selected so regenerate the whole tree
      return generate(0, maxDepth)
    } else {
      parent.node.parameters[parent.parameter] = generate(
        parent.depth,
        maxDepth
      )
    }
  }

  return root

  function findParents(node: Node, depth: number) {
    if (node.type === 'operator') {
      node.parameters.forEach((parameterNode, idx) => {
        parents.push({ node, parameter: idx, depth })

        findParents(parameterNode, depth + 1)
      })
    }
  }
}
