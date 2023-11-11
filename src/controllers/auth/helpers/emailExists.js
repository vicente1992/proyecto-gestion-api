const User = require('../../../models/user');

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = async (email = '') => {
  return await User.findOne({ email })
}

module.exports = { emailExists }
