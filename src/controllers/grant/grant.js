const { matchedData } = require("express-validator");
const grantModel = require('../../models/grant');
const { handleHttpError } = require('../../utils');
const { getAll, getOne } = require("./db");

const getItems = async (req, res) => {
  try {
    const { limit, skip } = req.pagination;
    const params = {
      limit,
      skip
    }  
    const data = await getAll(params);
    const count = await grantModel.countDocuments();
    res.send({ data, count });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = (await getOne(id)).pop(); 
    res.send(data);
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEM")
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    body.levelEducationId = body.levelEducation
    const data = await grantModel.create({ ...body })
    res.status(201);
    res.send(data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    body.levelEducationId = body.levelEducation
    const data = await grantModel.findByIdAndUpdate(id, body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
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

    const data = await grantModel.delete({ _id: id })
    res.json({ data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

const getUrlPath = (filename = '') => {
  return `${process.env.APP_URL}/storage/${filename}`
}

const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const imageUrl = getUrlPath(file.filename)
    res.json({ imageUrl })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_UPLOAD', error)
  }
}


module.exports = {
  getItems,
  createItem,
  uploadFile,
  deleteItem,
  updateItem,
  getItem
}