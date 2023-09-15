const express = require("express");
const { addBooking } = require("../controller/booking.controller");

const router = express.Router();

router.post("/add/:id", addBooking);

module.exports = router;
