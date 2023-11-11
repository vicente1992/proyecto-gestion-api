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

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const body = req.body;
    body.userId = userId;
    const data = await postModel.create({ ...body })
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

module.exports = {
  createItem,
  getItems,
}