const mongoose = require("mongoose");

const { Schema } = mongoose;

const package = new Schema(
  {
    name: {
        type: String,
        required: true,
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

module.exports = mongoose.model("packages", package);
