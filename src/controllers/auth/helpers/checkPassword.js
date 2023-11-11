
/**
 * Checks is password matches
 * @param {string} password - password 
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPassword = async (password = '', user = {}) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })


}

module.exports = { checkPassword }
