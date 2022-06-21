const mongoose = require("mongoose");

const path=require('path');



const userSchema = new mongoose.Schema(
  {
    name:{ type: String, default: "none" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

module.exports = User;