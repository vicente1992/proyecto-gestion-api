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
      isActive: { $first: "$isActive" },
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
      levelEducationId: 1,
      isActive: 1
    }
  }
]

const getAll = async (params = {}) => {

  const { limit, skip, title, levelEducation = null, status = null } = params

  const regex = new RegExp(title, 'i');
  const levelEducationId = levelEducation ? { levelEducationId: new Types.ObjectId(levelEducation) } : {}
  const isActive = status ? { isActive: status === 'true' ? true : false } : {};

  return grantModel.aggregate([
    ...aggregateGrant,
    {
      $match:
      {
        $or: [
          { title: regex },
        ],
        ...levelEducationId,
        ...isActive,
      },
    },
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