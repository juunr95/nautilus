const constants = require('./constants.js');
const crypto = require('crypto');

const { Buffer } = require('node:buffer');

module.exports = auth;

/**
 * Function that safe compare strings.
 * 
 * @param {Buffer} a - The first item.
 * @param {Buffer} b - The second item.
 */
function safeCompare(a, b) {
  return crypto.timingSafeEqual(a, b);
}

/**
 * Init the authentication.
 * 
 * @param {Object} options - Object with username and password.
 */
function auth(options) {
  if (typeof options !== 'object' || options === null) {
    throw new Error('Options must be an object.');
  }

  for (const key of constants.EXPECTED_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(options, key)) {
      throw new Error(`Options object must contain the key: ${key}`);
    }
  }

  const { username, password } = options;

  return function (req, res, next) {
    const { authorization } = req.headers;

    const unauthorized = () => {
      res.status(401)
        .header('WWW-Authenticate', 'Basic realm="User Visible Real"')
        .end(constants.UNAUTHORIZED);
    }

    // Check if there's authorization header. If not block request.
    if (!authorization) {
      return unauthorized();
    }

    // Get the encrypted credentials.
    const [ type, sent_credentials ] = authorization.split(' ');
    if (!type || type !== 'Basic') {
      return unauthorized();
    }

    // The credentials sent by browser is already base64 encoded.
    // So just create the buffer using base64 as encoder.
    const buffer_credentials = Buffer.from(sent_credentials, 'base64');

    // Create buffer with combination of username:password
    const credentials = Buffer.from(`${username}:${password}`);

    // If size of buffer are different, we know that most probably
    // credentials are wrong.
    if (buffer_credentials.length !== credentials.length) {
      return unauthorized();
    }

    // Check if username and password matchs. If not block request.
    if (!safeCompare(buffer_credentials, credentials)) {
      return unauthorized();
    }

    return next();
  }
}