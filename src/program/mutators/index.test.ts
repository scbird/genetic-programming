import { generate } from '../generate'
import { point } from './point'
import { regenerate } from './regenerate'
import { parse } from '../parse'
import { stringify } from '../stringify'
import { Node } from '../types'
import { validate } from '../validate'

describe('Regeneration mutator', () => {
  const maxDepth = 3

  it.each([
    ['regenerate', regenerate(maxDepth)],
    ['point', point()]
  ])('%p should generate valid expressions', (_, mutator) => {
    const originalExpression = stringify(generate(0, maxDepth))
    const mutatedNodes: Node[] = []

    for (let i = 0; i < 1000; i++) {
      mutatedNodes.push(mutator(parse(originalExpression), 0.1))
    }

    mutatedNodes.forEach((node) => {
      try {
        validate(node)
      } catch (e) {
        throw new Error(`Generated invalid expression ${stringify(node)}`)
      }
    })
  })
})
