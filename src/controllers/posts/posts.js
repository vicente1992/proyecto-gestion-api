const postModel = require('../../models/posts');
const { handleHttpError } = require('../../utils');

/**
 * Get all items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req = request, res) => {
  try {

    const data = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments"
        }
      },
      {
        $addFields: {
          numberOfComments: { $size: "$comments" }
        }
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes"
        }
      },
      {
        $addFields: {
          numberOfCLikes: { $size: "$likes" }
        }
      },
      {
        $unwind: {
          path: "$likes",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          title: { $first: "$title" },
          categoryId: { $first: "$categoryId" },
          images: { $first: "$images" },
          createdAt: { $first: "$createdAt" },
          username: { $first: "$user.name" },
          avatar: { $first: "$user.avatar" },
          numberOfComments: { $first: "$numberOfComments" },
          numberOfCLikes: { $first: "$numberOfCLikes" },
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          title: 1,
          categoryId: 1,
          images: 1,
          createdAt: 1,
          numberOfComments: 1,
          numberOfCLikes: 1,
          username: 1,
          avatar: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ])

    res.send(data);
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS")
  }
};


const getUrlPath = (filename = '') => {
  return `${process.env.APP_URL}/storage/${filename}`
}

const getImages = (files = []) => {

  const images = [];
  files.forEach(({ filename }) => {
    const urlPtah = getUrlPath(filename);
    images.push(urlPtah);
  })

  return images;
}

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { files = [], } = req;
    const userId = req.user.id;
    const { content = [], title = [], categoryId = [] } = req.body
    const images = getImages(files);
    const data = await postModel.create(
      {
        content: content.pop(),
        title: title.pop(),
        categoryId: categoryId.pop(),
        userId, images
      }
    )
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
    const { id } = req.params;

    const data = await postModel.delete({ _id: id })
    res.json({ data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

const getMostPopular = async (req, res) => {
  try {

    const data = await postModel.find({}, { _id: 1, title: 1, content: 1 },).limit(5);
    res.json(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETE_ITEM', error)
  }
}

module.exports = {
  createItem,
  getItems,
  deleteItem,
  getMostPopular
}