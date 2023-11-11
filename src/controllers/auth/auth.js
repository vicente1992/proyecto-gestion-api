const { matchedData } = require("express-validator");
const crypto = require("crypto");
const userModel = require("../../models/user");
const {
  emailExists,
  setUserInfo,
  returnRegisterToken,
  findUser,
  checkPassword,
  generateToken,
  avatarUrl,
} = require("./helpers");
const { handleHttpError, verifyToken } = require("../../utils");
const { validateMachine } = require("../../utils/validateMachine");

/**
 * Login
 * @param {*} req
 * @param {*} res
 */

const login = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await findUser(body.email);

    if (!user) return handleHttpError(res, "INVALID_CREDENTIAL", 422);

    const isPasswordMatch = await checkPassword(body.password, user);

    if (!isPasswordMatch)
      return handleHttpError(res, "INVALID_CREDENTIAL", 422);

    const userInfo = await setUserInfo(user);
    const data = {
      user: userInfo,
      token: generateToken(user),
    };
    res.status(201);
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN");
  }
};

/**
 * Register users
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    const body = matchedData(req);
    if (await emailExists(body.email))
      return handleHttpError(res, "EMAIL_ALREADY_EXISTS", 422);

    const uuid = crypto.randomUUID();
    const avatar = avatarUrl(body.name);
    const item = await userModel.create({ ...body, uuid, avatar });
    const userInfo = await setUserInfo(item);
    const data = await returnRegisterToken(userInfo);
    res.status(201);
    res.send(data);
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER");
  }
};

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const refreshToken = async (req, res) => {
  try {
    const tokenEncrypted = req.headers.authorization
      .replace("Bearer ", "")
      .trim();

    let { uuid } = await verifyToken(tokenEncrypted);
    const user = await userModel.findOne({ uuid });
    const userInfo = await setUserInfo(user);
    const data = await returnRegisterToken(user, userInfo);
    res.status(200);
    res.json(data);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Check machine id is ok
 * @param {*} req
 * @param {*} res
 */
const check = async (req, res) => {
  try {
    const body = matchedData(req);
    const token = validateMachine(body.userId);
    if (token !== body.hash)
      return handleHttpError(res, "INVALID_CREDENTIAL", 422);
    const user = await userModel.findOne({ uuid: body.userId });

    if (!user.status) return handleHttpError(res, "USER_UNAVAILABLE", 422);

    res.json(user);
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

module.exports = { login, register, refreshToken, check };
