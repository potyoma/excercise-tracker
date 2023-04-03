const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { String } = Schema.Types;

const UserSchema = new Schema({
  username: String,
});

const User = model("User", UserSchema);

const create = async (username) => {
  const user = new User({ username });
  return await user.save();
};

module.exports = { create };
