const nautilus = require('../index.js');

describe('middleware tests', () => {
  it('should return a middleware function', () => {
    const middleware = nautilus({ username: 'foo', password: 'bar'});

    expect(typeof middleware).toBe('function');
  })

  it('should validate object keys', () => {
    expect(() => nautilus({ foo: 1, bar: 1 })).toThrow()
  })

  it('should not throw error with corret object keys', () => {
    expect(() => nautilus({ username: '', password: '' })).not.toThrow()
  })

  it('should return 401 if authorization header not set', () => {
    
  })
})