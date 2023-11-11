const { matchedData } = require('express-validator');
const nanoid = require('nanoid');
const xlsx = require('xlsx');
const tenantModel = require('../../models/tenant');
const { Roles, EXTENSIONS, handleHttpError } = require('../../utils');
const { getSheetToJson, parseMenu, mapQuery } = require('./helpers');
const { request } = require('express');
// const MEDIA_PATH = `${__dirname}/../../storage`;
const MEDIA_PATH = '/public/storage/'
// process.cwd()

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const query = tenantModel.where({ uuid: id })
    const data = await query.findOne()
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEM")
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const body = matchedData(req);
    body.userId = userId;
    const ID_REF = `t${nanoid.nanoid()}`
    const data = await tenantModel.create({ ...body, uuid: ID_REF });
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
    const { uuid, role } = req.user;
    const { limit, skip } = req.pagination
    const { search } = req.query;
    const query = role === Roles.admin ? {} : { userId: uuid };
    const data = await tenantModel.find({ ...query, $or: [...mapQuery(search)] }).skip(skip).limit(limit);
    const countPages = await tenantModel.countDocuments({ ...query, $or: [...mapQuery(search)] });
    res.send({ data, countPages });
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
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tenantModel.findByIdAndUpdate(id, body);
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

    const data = await tenantModel.delete({ _id: id })
    res.json({ data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const uploadMenu = async (req, res) => {
  try {
    const { file } = req;
    if (!EXTENSIONS.includes(file.filename.split('.').pop()))
      return handleHttpError(res, "INVALID_EXTENSION");
    req = matchedData(req)
    const filePath = `${process.cwd()}${MEDIA_PATH}/${file.filename}`;
    const workBook = xlsx.readFile(filePath);
    const [, drinks, meals] = workBook.SheetNames;
    const drinksData = getSheetToJson(workBook, drinks);
    const mealsData = getSheetToJson(workBook, meals);
    const tenant = await tenantModel.findById(req.id);
    tenant.drinks = [...parseMenu(drinksData)];
    tenant.meals = [...parseMenu(mealsData)];
    const data = await tenantModel.findByIdAndUpdate(tenant._id, tenant);
    res.json(data)
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_UPLOAD', error)
  }
}



module.exports = { getItem, createItem, getItems, updateItem, deleteItem, uploadMenu };