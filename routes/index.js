const router = require("express").Router();

const noteRoutter = require("./note");
const userRoutter = require("./user");

router.use(userRoutter);
router.use(noteRoutter);

module.exports = router;
