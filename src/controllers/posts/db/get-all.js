// [
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "postId",
//       as: "comments"
//     }
//   },
//   {
//     $addFields: {
//       numberOfComments: { $size: "$comments" }
//     }
//   },
//   {
//     $unwind: {
//       path: "$comments",
//       preserveNullAndEmptyArrays: true
//     }
//   },
//   {
//     $lookup: {
//       from: "users",
//       localField: "comments.userId",
//       foreignField: "_id",
//       as: "comments.user"
//     }
//   },
//   {
//     $unwind: {
//       path: "$comments.user",
//       preserveNullAndEmptyArrays: true
//     }
//   },
//   {
//     $project: {
//       _id: 1,
//       title: 1,
//       content: 1,
//       createdAt: 1,
//       numberOfComments: 1,
//       "comments.text": 1,
//       "comments.createdAt": 1,
//       "comments.postId": 1,
//       "comments.userId": 1,
//       "comments.user.name": 1,
//       "comments.user.avatar": 1
//     }
//   },
//   {
//     $group: {
//       _id: "$_id",
//       title: { $first: "$title" },
//       content: { $first: "$content" },
//       createdAt: { $first: "$createdAt" },
//       numberOfComments: { $first: "$numberOfComments" },
//       comments: { $push: "$comments" }
//     }
//   },
//   { $sort: { createdAt: -1 } }
// ]