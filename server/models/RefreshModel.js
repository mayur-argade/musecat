const mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema

const refreshSchema = new mongoose.Schema(
  {
    tokens: {
      type: String,
      required: true,
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Refresh", refreshSchema, "tokens");