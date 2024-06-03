const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const grantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  initialDate: {
    type: String,
    required: true
  },
  dateEnd: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  levelEducationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LevelEducation',
    required: true
  },

},
  {
    versionKey: false,
    timestamps: true,
  }
);

grantSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("grant", grantSchema);
