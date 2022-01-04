import { generate } from './generate'
import { mutate } from './mutate'
import { parse } from './parse'
import { stringify } from './stringify'
import { Node } from './types'
import { validate } from './validate'

describe('Mutations', () => {
  it('should generate valid expressions', () => {
    const originalExpression = stringify(generate(0, 3))
    const mutatedNodes: Node[] = []

    for (let i = 0; i < 1000; i++) {
      mutatedNodes.push(mutate(parse(originalExpression), 0.1, 3))
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
