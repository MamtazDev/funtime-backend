const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["admin", "client", "user"],
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    age: {
      type: String,
      require: false,
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"],
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },

    // image: {
    //   type: String,
    //   required: false,
    //   default:
    //     "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    // },

    // postCode: {
    //   type: Number,
    //   required: true,
    // },
    // phoneNumber: {
    //   type: String,
    //   required: false,
    // },
    // residance: {
    //   type: String,
    //   required: true,
    // },
    // streetOrHouseNumber: {
    //   type: String,
    //   required: false,
    // },
    // url: {
    //   type: String,
    //   required: false,
    //   default: "fkljsklfklsfkljsf",
    // },

    // availability: {
    //   type: [String],
    //   required: false,
    // },
    // offerProvide: {
    //   type: [String],
    //   required: false,
    // },
    // aboutMe: {
    //   type: String,
    //   required: false,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },

    // parentSearch: {
    //   type: Boolean,
    //   default: false,
    // },
    // distance: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
