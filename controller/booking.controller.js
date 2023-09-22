const Booking = require("../models/booking.model");

const addBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
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

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("bookedCompanion");
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  addBooking,
  getAllBookings,
};
