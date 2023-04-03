const userRepo = require("../repo/user");
const excRepo = require("../repo/excercise");

const getLog = async (userId, from, to, limit) => {
  const user = await userRepo.getById(userId);
  const exercises = await excRepo.getByUser(
    user?.username,
    new Date(from),
    new Date(to),
    parseInt(limit)
  );
  const res = {
    _id: user?._id,
    username: user?.username,
    count: exercises.length,
    log: exercises.map((ex) => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date?.toDateString(),
    })),
  };
  return res;
};

module.exports = { getLog };
