const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/models");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected from user");
  })
  .catch(() => {
    console.log("error at user");
  });

router.use(express.json({ extended: false }));
router.use(express.urlencoded({ extended: true }));

router.post("/createuser", async (req, res) => {
  const user = await userModel(req.body);
  user.save();
  if (user) {
    res.status(200).json({
      user,
    });
  }
});

router.get("/getusers", async (req, res) => {
  const users = await userModel.find({});

  if (users) {
    res.status(200).json(users);
  }
});

router.put("/updateuser", async (req, res) => {
  const userName = "Woynshet Bilihatu";
  const newName = "Woynshet Bilihatu Abeze";

  const newphoneNumber = "+251911799831";
  const newemail = "woynshetbilihatu@.com";
  const newAge = 24;

  const user = await userModel.findOne({ userName });

  if (userName) {
    const updateDoc = {
      $set: {
        name: newName,
        phonenumber: newphoneNumber,
        email: newemail,
        age: newAge,
      },
    };

    const result = await userModel.updateOne(updateDoc);

    if (result) {
      res.status(200).json({
        message: "updated successfully",
      });
    } else {
      console.log("error");
    }
  } else {
    res.status(500).json({ message: "error " });
  }
});

router.delete("/delete", async (req, res) => {
  const title = "about work";
  const note = await noteModel.findOne({ title });

  if (note) {
    const varDeleted = await noteModel.findOneAndRemove({
      title,
    });
    res.status(200).json(varDeleted);
  } else {
    res.status(500).json({ message: "have no work to do" });
  }
});

module.exports = router;
