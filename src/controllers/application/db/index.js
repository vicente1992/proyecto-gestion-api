const { Types } = require('mongoose');
const applicationModel = require('../../../models/applications')

const getAll = async (params = {}) => {
  const { limit, skip, userId = null, status = '', title = '' } = params;
  const statusQuery = status ? { status } : {};

  const queryUserId = userId ? { userId: new Types.ObjectId(userId) } : {};
  const regex = new RegExp(title, 'i');

  return applicationModel.aggregate([
    {
      $match: {
        $or: [
          { documentNumber: regex },
        ],
        ...queryUserId,
        ...statusQuery
      },
    },
    {
      $lookup: {
        from: "grants",
        localField: "grantId",
        foreignField: "_id",
        as: "grant"
      }
    },
    { $unwind: '$grant' },
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
      $group: {
        _id: "$_id",
        title: { $first: "$grant.title" },
        userName: { $first: "$user.name" },
        email: { $first: "$user.email" },
        documentNumber: { $first: "$documentNumber" },
        document: { $first: "$document" },
        status: { $first: "$status" },
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        userName: 1,
        email: 1,
        documentNumber: 1,
        document: 1,
        status: 1,
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ])

}
const generateReportQuery = async (params = {}) => {
  const { status = '', title = '' } = params;
  const statusQuery = status ? { status } : {};

  const regex = new RegExp(title, 'i');

  return applicationModel.aggregate([
    {
      $match: {
        $or: [
          { documentNumber: regex },
        ],
        ...statusQuery
      },
    },
    {
      $lookup: {
        from: "grants",
        localField: "grantId",
        foreignField: "_id",
        as: "grant"
      }
    },
    { $unwind: '$grant' },
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
      $group: {
        _id: "$_id",
        title: { $first: "$grant.title" },
        userName: { $first: "$user.name" },
        email: { $first: "$user.email" },
        documentNumber: { $first: "$documentNumber" },
        document: { $first: "$document" },
        status: { $first: "$status" },
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        userName: 1,
        email: 1,
        documentNumber: 1,
        document: 1,
        status: 1,
      }
    },
    { $sort: { createdAt: -1 } },

  ])

}

module.exports = { getAll, generateReportQuery }