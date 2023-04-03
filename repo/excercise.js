const { Schema, model } = require("mongoose");

const userRepo = require("./user");

const { String, Number, Date } = Schema.Types;

const ExcerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: { type: Date, default: new Date(Date.now?.()) },
});

const Excercise = model("Excercise", ExcerciseSchema);

const create = async (userId, description, duration, date) => {
  const { username } = await userRepo.getById(userId);
  const excercise = new Excercise({
    username,
    description,
    duration,
    date,
  });
  return await excercise.save();
};

module.exports = { create };
