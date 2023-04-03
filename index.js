const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRepo = require("./repo/user");
const excRepo = require("./repo/excercise");

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.post("/api/users/:id/exercises", async (req, res) => {
  const { id } = req.params;
  const { description, duration, date } = req.body;
  const excercise = await excRepo.create(id, description, duration, date);
  res.json(excercise);
});

app
  .route("/api/users")
  .post(async (req, res) => {
    const { username } = req.body;
    const user = await userRepo.create(username);
    res.json(user);
  })
  .get(async (req, res) => {
    const users = await userRepo.getAll();
    res.json(users);
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
