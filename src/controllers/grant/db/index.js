const { Types } = require("mongoose");
const grantModel = require("../../../models/grant")

const aggregateGrant = [
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
  }
]

const getAll = async (params = {}) => {

  const { limit, skip } = params

  return grantModel.aggregate([
    ...aggregateGrant,
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ])
};


const getOne = (id) => {
  return grantModel.aggregate([
    ...aggregateGrant,
    {
      $match:
      {
        _id: new Types.ObjectId(id),
      },
    },

  ])

}

module.exports = { getAll, getOne }