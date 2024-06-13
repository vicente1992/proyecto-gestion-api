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
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await levelEducationModel.findByIdAndUpdate(id, body);
    res.status(201);
    res.send({ data });
  } catch (e) { 
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req;

    const data = await levelEducationModel.delete({ _id: id })
    res.json({ data })
  } catch (error) { 
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem

}