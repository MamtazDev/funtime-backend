const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPlace: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      required: true,
    },
    bookedCompanion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companion",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
