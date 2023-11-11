const User = require('../../../models/user');
/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = async (email = '') => {
  return await User.findOne({ email });

}

module.exports = { findUser }
