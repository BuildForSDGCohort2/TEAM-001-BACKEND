const mongoose = require("mongoose");

const { Schema } = mongoose;

const package = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "senders",
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
    },
    receiverContact: {
      phone: String,
      email: String
    },
    size: String,
    agent: {
      type: Schema.Types.ObjectId,
      ref: "agents",
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("packages", package);
