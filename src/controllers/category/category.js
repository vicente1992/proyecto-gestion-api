const { matchedData } = require('express-validator');
const categoryModel = require('../../models/category');
const ratingModel = require('../../models/rating');
const { handleHttpError } = require('../../utils');



/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { body } = req;
    const data = await categoryModel.create({ ...body });
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};


/**
 * Get all items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req = request, res) => {
  try {
    const data = await categoryModel.find({});
    res.send(data);
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS")
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

    const data = await categoryModel.delete({ _id: id })
    res.json({ data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

const getRatingByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ratingModel.where({ categoryId: id })
    res.json(data)
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}


module.exports = { createItem, getItems, deleteItem, getRatingByCategory };