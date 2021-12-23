import { parse } from './parse'
import { stringify } from './stringify'

describe('stringify', () => {
  test.each(['add(2, 4)', 'sub(not(4), 5)', 'if(not(6), add(4, 3), 5)'])(
    'stringify(%p)',
    (expression) => {
      expect(stringify(parse(expression))).toBe(expression)
    }
  )
})
