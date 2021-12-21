const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
}).parsed;

console.log(process.env.MONGODB_URL);

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
