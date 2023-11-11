const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Debe se pasar el objero del usuario
 * @param {*} user 
 */
const tokenSing = async (user = {}) => {
  const sing = jwt.sign({
    uuid: user.uuid,
    role: user.role
  },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }

  )
  return sing
}
/**
 * Debe pasar el token de sessión
 * @param {*} tokenJwt 
 * @returns 
 */

const verifyToken = async (tokenJwt) => {
  try {
    return await jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}


module.exports = {
  tokenSing,
  verifyToken
}

