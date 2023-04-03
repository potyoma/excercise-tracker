const excRepo = require("../repo/excercise");
const userRepo = require("../repo/user");

const create = async (userId, description, duration, date) => {
  const user = await userRepo.getById(userId);
  const excercise = await excRepo.create(
    user.username,
    description,
    duration,
    date
  );
  const res = {
    _id: user._id,
    username: user.username,
    description: excercise.description,
    date: excercise.date?.toDateString(),
    duration: excercise.duration,
  };
  return res;
};

module.exports = { create };
