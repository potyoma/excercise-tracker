const { Schema, model } = require("mongoose");

const { String, Number } = Schema.Types;

const ExcerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: { type: Schema.Types.Date, default: Date.now() },
});

const Excercise = model("Excercise", ExcerciseSchema);

const create = async (username, description, duration, date) => {
  const excercise = new Excercise({
    username,
    description,
    duration,
  });

  if (date) excercise.date = new Date(date);

  return await excercise.save();
};

const getByUser = async (username, from, to, limit) => {
  const filter = { username };

  if (from != "Invalid Date") filter.date = { $gt: from };
  if (to != "Invalid Date") filter.date = { $lt: to };

  const query = Excercise.find(filter);

  if (!isNaN(limit)) query.limit(limit);

  return await query.exec();
};

module.exports = { create, getByUser };
