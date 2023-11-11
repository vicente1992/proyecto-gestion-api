const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { tenantStatus } = require("../utils");
const TenantScheme = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    manager: {
      type: String,
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    delivery: {
      type: String,
    },
    website: {
      type: String,
    },
    botName: {
      type: String,
    },
    location: {
      type: String,
    },
    meals: {
      type: [],
      default: [],
    },
    drinks: {
      type: [],
      default: [],
    },
    schedule: {
      type: String,
    },
    enable: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true
    },

    openAiKey: {
      type: String,
    },
    containerId: {
      type: String,
    },
    status: {
      type: String,
      enum: [tenantStatus.available, tenantStatus.inProgress, tenantStatus.unAvailable],
      default: tenantStatus.unAvailable
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

TenantScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tenant", TenantScheme);
