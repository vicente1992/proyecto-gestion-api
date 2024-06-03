const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const levelEducation = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

levelEducation.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("levelEducation", levelEducation);
