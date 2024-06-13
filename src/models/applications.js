const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const status = {
  pending: 'pending',
  underReview: 'underReview',
  approved: 'approved',
  rejected: 'rejected'
}

const applicationSchema = new mongoose.Schema({
  documentNumber: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  grantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grant',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: [status.pending, status.underReview, status.approved, status.rejected],
    default: status.pending
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

applicationSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("application", applicationSchema);
