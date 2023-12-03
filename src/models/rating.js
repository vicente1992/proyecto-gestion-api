const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const ratingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

ratingSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("rating", ratingSchema);
