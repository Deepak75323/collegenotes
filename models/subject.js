const mongoose = require("mongoose");

const path = require("path");

const subjectSchema = new mongoose.Schema(
  {
    subname: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
resources:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
branch: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
