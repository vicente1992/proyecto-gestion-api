const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const PostScheme = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    content: {
      type: String,
      required: true
    },
    // images: [{
    //   imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    // }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      commentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
      },
    }],

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PostScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("posts", PostScheme);
