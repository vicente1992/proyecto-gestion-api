/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      id: req._id,
      name: req.name,
      email: req.email,
      role: req.role,
      uuid: req.uuid,
      avatar: req.avatar,
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
