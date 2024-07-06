const nautilus = require('../index.js');

describe('middleware tests', () => {
  it('should return a middleware function', function () {
    const middleware = nautilus({ username: 'foo', password: 'bar'});

    expect(typeof middleware).toBe('function');
  })

  it('should validate object keys', function () {
    expect(() => nautilus({ foo: 1, bar: 1 })).toThrow()
  })

  it('should not throw error with corret object keys', function () {
    expect(() => nautilus({ username: '', password: '' })).not.toThrow()
  })

  it('should return 401 if authorization header not set', function () {
    const middleware = nautilus({ username: 'foo', password: 'bar'});

    const req = {
      headers: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    }

    middleware(req, res, {});

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.header).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="User Visible Real"')
    expect(res.end).toHaveBeenCalledWith('Unauthorized');
  })

  it('should validate if realm is different than Basic', function () {
    const middleware = nautilus({ username: 'foo', password: 'bar'});

    const req = {
      headers: {
        authorization: 'Test'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    }

    middleware(req, res, {});

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.header).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="User Visible Real"')
    expect(res.end).toHaveBeenCalledWith('Unauthorized');
  })

  it('should compare credentials and return success', function () {
    const middleware = nautilus({ username: 'foo', password: 'bar' });

    const req = {
      headers: {
        authorization: 'Basic ' + btoa('foo:bar')
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    }

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  })

  it('should compare credentials and return error if dont match', function () {
    const middleware = nautilus({ username: 'test', password: 'test' });

    const req = {
      headers: {
        authorization: 'Basic ' + btoa('abc:abc')
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    }

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
  })
})