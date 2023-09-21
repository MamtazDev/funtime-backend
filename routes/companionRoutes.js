const express = require("express");
const {
  addCompanion,
  getAllCompanion,
  changeOnlineStatus,
  searchCompanion,
  deleteCompanion,
} = require("../controller/companion.controller");

const router = express.Router();

router.post("/add", addCompanion);
router.get("/", getAllCompanion);
router.get("/search", searchCompanion);
router.delete("/delete/:id",deleteCompanion)
router.put("/changeOnlineStatus/:id", changeOnlineStatus);

module.exports = router;
