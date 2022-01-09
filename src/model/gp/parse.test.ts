import { parse } from './parse'
import { Node } from './types/types'

const TEST_CASES: TestCase[] = [
  [
    'add(2, 3)',
    {
      type: 'operator',
      func: 'add',
      parameters: [
        { type: 'terminal', value: 2 },
        { type: 'terminal', value: 3 }
      ]
    }
  ],
  [
    'add ( not(2), 3)',
    {
      type: 'operator',
      func: 'add',
      parameters: [
        {
          type: 'operator',
          func: 'not',
          parameters: [{ type: 'terminal', value: 2 }]
        },
        { type: 'terminal', value: 3 }
      ]
    }
  ],
  [
    'add ( 3 ,\n not( 2 ) )',
    {
      type: 'operator',
      func: 'add',
      parameters: [
        { type: 'terminal', value: 3 },
        {
          type: 'operator',
          func: 'not',
          parameters: [{ type: 'terminal', value: 2 }]
        }
      ]
    }
  ]
]

describe('parse()', () => {
  it.each(TEST_CASES)(
    'should correctly parse expressions (%p)',
    (expression, expected) => {
      expect(parse(expression)).toEqual(expected)
    }
  )
})

type TestCase = [string, Node]
