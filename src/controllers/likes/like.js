const likeModel = require('../../models/like');
const { handleHttpError } = require('../../utils');



/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = req.body;
    body.userId = userId;
    const data = await likeModel.create({ ...body })
    res.status(201);
    res.send(data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

module.exports = {
  createItem,
}