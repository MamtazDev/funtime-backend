const express = require("express");
const {
  addBooking,
  getAllBookings,
} = require("../controller/booking.controller");

const router = express.Router();

router.get("/", getAllBookings);
router.post("/add/:id", addBooking);

module.exports = router;
