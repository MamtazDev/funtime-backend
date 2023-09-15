const mongoose = require("mongoose");

const companionSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
    boobType: {
      type: String,
      required: true,
    },
    can: {
      type: String,
      required: true,
    },
    cant: { 
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Companion = mongoose.model("Companion", companionSchema);

module.exports = Companion;
