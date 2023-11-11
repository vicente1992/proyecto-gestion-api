const { request } = require('express')
const usersModel = require('../models/user');
const { handleHttpError, verifyToken } = require('../utils');


const authMiddleware = async (req = request, res, next) => {

  try {
    const token = req.headers.authorization?.split(' ').pop();
    if (!token) {
      return handleHttpError(res, 'NOT_TOKEN', 401)
    }

    const dataToken = await verifyToken(token);
    if (!dataToken) {
      return handleHttpError(res, 'NOT_PAYLOAD_TOKEN', 401)
    }
    const user = await usersModel.findOne({ uuid: dataToken.uuid })
    req.user = user;
    next()
  } catch (error) {
    handleHttpError(res, 'NOT_SESSION', error,)
  }

}

module.exports = { authMiddleware }