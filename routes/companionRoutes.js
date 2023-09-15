const express = require("express");
const {
  addCompanion,
  getAllCompanion,
} = require("../controller/companion.controller");

const router = express.Router();

router.post("/add", addCompanion);
router.get("/", getAllCompanion);

module.exports = router;
