const { matchedData } = require("express-validator");
const grantModel = require('../../models/grant');
const { handleHttpError } = require('../../utils');

const getItems = async (req, res) => {
  try {
    const data = await grantModel.aggregate([
      {
        $lookup: {
          from: "leveleducations",
          localField: "levelEducationId",
          foreignField: "_id",
          as: "level"
        }
      },
      { $unwind: '$level' },

      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          logo: { $first: "$logo" },
          requirements: { $first: "$requirements" },
          initialDate: { $first: "$initialDate" },
          dateEnd: { $first: "$dateEnd" },
          createdAt: { $first: "$createdAt" },
          levelEducation: { $first: "$level.name" },
          levelEducationId: { $first: "$level._id" },
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          requirements: 1,
          logo: 1,
          createdAt: 1,
          initialDate: 1,
          dateEnd: 1,
          levelEducation: 1,
          levelEducationId: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ])
    res.send(data);
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
    const query = grantModel.where({ _id: id })
    const data = await query.findOne()
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