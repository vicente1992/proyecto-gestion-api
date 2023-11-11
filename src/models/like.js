const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const likeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

likeSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("like", likeSchema);
