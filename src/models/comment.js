const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
  },
  text: {
    type: String,
    required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

commentSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("comment", commentSchema);
