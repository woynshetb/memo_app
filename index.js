const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
}).parsed;

// create app using express
const app = express();
const router = require("./routes");

app.use(router);
const server = http.createServer(app);

// needed expression
router.use(express.json({ extended: false }));
router.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(function (req, res, next) {
  next();
});
router.get("/", (req, res) => {
  res.render("pages/index");
});
app.use(router);

server.listen(PORT, function () {
  console.log("server is running at $" + PORT);
});
