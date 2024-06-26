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
    title: {
      type: String,
      required: true
    },
    images: [],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      commentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
      },
    }],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', required: true
    },
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }],

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PostScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("posts", PostScheme);
