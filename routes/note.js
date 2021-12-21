const express = require("express");
const note = require("../models/noteModel");
const router = express.Router();
const mongoose = require("mongoose");
const noteModel = require("../models/noteModel");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error at creating");
  });

// should delete

router.use(express.json({ extended: false }));
router.use(express.urlencoded({ extended: true }));

router.post("/createnote", async (req, res) => {
  const note = await noteModel(req.body);
  note.save();
  if (note) {
    res.status(200).json({
      note,
    });
  }
});

router.get("/getnotes", async (req, res) => {
  const email = "suz@gmail.com";
  const notes = await noteModel.find({});

  if (notes) {
    console.log(notes);
    console.log(email);
    console.log("whats ");
    res.status(200).json(notes);
  }
});

router.put("/update", async (req, res) => {
  const title = "about class";
  const newTitle = "about work";

  const newBody = " work is boring";
  const note = await noteModel.findOne({ title });

  if (note) {
    const updateDoc = {
      $set: {
        title: newTitle,
        body: newBody,
      },
    };

    const result = await noteModel.updateOne(updateDoc);

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
