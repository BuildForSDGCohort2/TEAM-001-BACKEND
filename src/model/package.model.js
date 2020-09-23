const mongoose = require("mongoose");

const { Schema } = mongoose;

const package = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: sender,
    },
    packageName: {
      type: String,
      required: true,
    },
    destination: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      receiverName: {
        type: String,
        required: true,
      },
      receiverAddress: {
        type: String,
        required: true,
      },
      receiverContact: {
        type: String,
        required: true,
      },
    },
    size: String,
    agent: {
      type: String,
      required: true
    },
    description: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("packages", package);
