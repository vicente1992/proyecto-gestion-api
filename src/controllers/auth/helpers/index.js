const { checkPassword } = require('./checkPassword');
const { avatarUrl } = require('./create-avatar');
const { emailExists } = require('./emailExists');
const { findUser } = require('./findUser');
const { generateToken } = require('./generateToken');
const { returnRegisterToken } = require('./returnRegisterToken');
const { setUserInfo } = require('./setUserInfo');

module.exports = {
  setUserInfo,
  emailExists,
  returnRegisterToken,
  findUser,
  checkPassword,
  generateToken,
  avatarUrl,
}