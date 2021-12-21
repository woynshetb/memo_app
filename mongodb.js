const res = require("express/lib/response");
const mongoose = require("mongoose");

const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
}).parsed;

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, database) => {
    if (error) {
      return console.log("unable to connect");
    }
    console.log("Coneected successfully");
    console.log(database);
    // const db = mongoose.connection;
    // db.collection("users").insertOne({
    //   name: "woynshet",
    //   age: "24",
    // });
  }
);
