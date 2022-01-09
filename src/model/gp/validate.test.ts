import { validate } from './validate'

describe('validation', () => {
  it('should check operator is valid', () => {
    expect(() =>
      validate({
        type: 'operator',
        func: 'unknown',
        parameters: []
      })
    ).toThrowError()
  })

  it('should check number of parameters', () => {
    expect(() =>
      validate({
        type: 'operator',
        func: 'not',
        parameters: []
      })
    ).toThrowError()

    expect(() =>
      validate({
        type: 'operator',
        func: 'not',
        parameters: [
          { type: 'terminal', value: 3 },
          { type: 'terminal', value: 5 }
        ]
      })
    ).toThrowError()
  })

  it('should check parameters', () => {
    expect(() =>
      validate({
        type: 'operator',
        func: 'not',
        parameters: [{ type: 'terminal', value: 4 }]
      })
    ).not.toThrowError()

    expect(() =>
      validate({
        type: 'operator',
        func: 'not',
        parameters: [{ type: 'terminal', value: NaN }]
      })
    ).toThrowError()
  })
})
