const { generateToken } = require('./generateToken')

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = (
  userInfo = {},
) => {
  return new Promise(async (resolve) => {
    const data = {
      token: generateToken(userInfo),
      user: userInfo,
    }
    resolve(data)
  })
}

module.exports = { returnRegisterToken }
