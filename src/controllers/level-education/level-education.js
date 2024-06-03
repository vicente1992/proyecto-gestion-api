const { matchedData } = require("express-validator");
const levelEducationModel = require('../../models/level-education');
const { handleHttpError } = require('../../utils');


/**
 * Get all items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req = request, res) => {
  try {
    const data = await levelEducationModel.find({});
    res.send(data);
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS")
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await levelEducationModel.create({ ...body })
    res.status(201);
    res.send(data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

module.exports = {
  getItems,
  createItem,

}