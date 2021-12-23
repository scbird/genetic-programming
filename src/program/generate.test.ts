import { generate } from './generate'
import { stringify } from './stringify'
import { validate } from './validate'

describe('generate', () => {
  it('should generate valid expressions', () => {
    for (let i = 0; i < 1000; i++) {
      const expression = generate()

      try {
        validate(expression)
      } catch (e) {
        throw new Error(`Generated invalid expression ${stringify(expression)}`)
      }
    }
  })
})
