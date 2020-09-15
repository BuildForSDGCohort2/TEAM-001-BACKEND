const mongoose = require("mongoose");

const { Schema } = mongoose;

const agent = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    nationality: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("agents", agent);
