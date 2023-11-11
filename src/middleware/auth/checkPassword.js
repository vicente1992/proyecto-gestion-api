

/**
 * Checks is password matches
 * @param {string} password - password 
 * @returns {boolean}
 */
const checkPassword = (password = '', user = {}) => {
  return new Promise((resolve) => {
    user.comparePassword(password, (isMatch) => {
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

module.exports = { checkPassword }
