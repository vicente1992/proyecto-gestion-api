const jwt = require('jsonwebtoken')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = {}) => {
  try {

    const sing = jwt.sign({
      uuid: user.uuid,
      role: user.role
    },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }

    )
    return sing
  } catch (error) {
    throw error
  }
}

module.exports = { generateToken }
