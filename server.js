const express = require("express");

const res = require("express/lib/response");
const mongoose = require("mongoose");
//const Router = require("./routes");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
}).parsed;
const userModel = require("./models/models");
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Coneected successfully");
});
// adding user is working
app.post("/add_user", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// getting user is working
app.get("/getuser", async (req, res) => {
  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(error);
  }
});

// delete is working
app.delete("/deleteUser", async (req, res) => {
  const user = await userModel.find({ name: "miki" });

  if (user) {
    // const update
    var isDeleted = await userModel.findOneAndRemove({ name: "miki" });
    console.log(isDeleted);
  }
  res.send(user);
});
// lets update

app.put("/update", async (req, res) => {
  const { age } = req.body;
  const user = await userModel.findOne({ name: "Zenebech" });

  console.log(age);
  console.log(user);
  if (user) {
    const updateDocument = {
      $set: {
        age: age,
      },
    };
    console.log("whats up");
    const result = await user.updateOne(updateDocument);
    if (result) {
      res.status(200).json("updated successfuly");
    } else {
      res.status(201).json(err.message);
    }
  } else {
    res.status(500).json({ message: "error " });
  }
});
// app.use(Router);
app.listen(3000);
