const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const ScorePostSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

ScorePostSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("scorePost", ScorePostSchema);
