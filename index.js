const constants = require('./constants.js');

module.exports = auth;

/**
 * Init the authentication.
 * 
 * @param {Object} options - Object with username and password.
 */
function auth(options) {
  if (typeof options !== 'object') {
    throw Error('Options need to be and object with username and password.');
  }

  const { username, password } = options;

  if (username.length === 0 || password.length === 0) {
    throw Error('Username and password cannot be null.');
  }

  return function (req, res, next) {
    const { authorization } = req.headers;

    const unauthorized = () => {
      res.status(401)
        .header('WWW-Authenticate', 'Basic realm="User Visible Real"')
        .end(constants.UNAUTHORIZED);

      return;
    }

    // Check if there's authorization header. If not block request.
    if (!authorization) {
      return unauthorized();
    }

    // Get the encrypted credentials and convert it back to text.
    const [, encrypted_credentials ] = authorization.split(' ');
    const [ user, pass ] = atob(encrypted_credentials).split(':');

    // Check if username and password matchs. If not block request.
    if (user !== username || pass !== password) {
      return unauthorized();
    }

    return next();
  }
}