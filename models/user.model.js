const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    pass: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
