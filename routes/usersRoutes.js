const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
} = require("../controller/users.controller");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);

module.exports = router;
