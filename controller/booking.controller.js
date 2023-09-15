const Booking = require("../models/booking.model");

const addBooking = async (req, res) => {
  const { userName, userEmail, userPlace, roomNumber, specialRequests } =
    req.body;
  try {
    const newBooking = new Booking({
      userName,
      userEmail,
      userPlace,
      roomNumber,
      specialRequests,
      bookedCompanion: req.params.id,
    });
    const booking = await newBooking.save();

    res.status(200).send({
      message: "Companinon booked successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  addBooking,
};
