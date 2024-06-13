const { matchedData } = require("express-validator");
const applicationModel = require('../../models/applications');
const { handleHttpError } = require('../../utils');
const { getAll, generateReportQuery } = require("./db");
const XLSX = require('xlsx');
const { request } = require("express");


/**
 * Get all items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req = request, res) => {
  try {
    const { userId, status, title } = req.query;
    const { limit, skip } = req.pagination;
    const params = {
      limit,
      skip,
      userId,
      status,
      title
    }
    const data = await getAll(params);
    const count = await applicationModel.countDocuments();
    res.send({ data, count });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS")
  }
};

const applicationExists = async (userId, grantId) => {
  const data = await applicationModel.findOne({ grantId, userId });
  return !!data;
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = matchedData(req);
    body.userId = userId
    const exists = await applicationExists(userId, body.grantId);
    if (exists) return handleHttpError(res, "ALREADY_EXISTS", 409);
    const data = await applicationModel.create({ ...body })
    console.log(exists);
    res.status(201);
    res.send(data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await applicationModel.findByIdAndUpdate(id, body);
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

    const data = await applicationModel.delete({ _id: id })
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}
const generateReport = async (req = request, res) => {
  try {
    const { status = '', title = '' } = req.query;
    const params = {
      status,
      title
    }
    const data = await generateReportQuery(params);

    const worksheet = XLSX.utils.json_to_sheet(data);

    const wscols = [
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 50 },
      { wch: 25 },
    ];

    worksheet['!cols'] = wscols;
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const excelBase64 = excelBuffer.toString('base64');
    res.json(excelBase64);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  generateReport

}