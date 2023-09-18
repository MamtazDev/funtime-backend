const User = require("../models/users.model");
const bcrcypt = require("bcryptjs");
const { generateToken } = require("../utils/auth");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else {
      const newUser = new User({
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrcypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      const accessTOken = await generateToken(user);

      res.status(200).send({
        data: {
          user: {
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
          accessTOken,
        },
        message: "User Created Successfully!",
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrcypt.compareSync(req.body.password, user.password)) {
      const accessTOken = await generateToken(user);
      const userData = await User.findOne({ email: req.body.email }).select(
        "-password"
      );
      return res.send({
        message: "Logged in successfully",
        status: 200,
        user: userData,
        accessTOken,
      });
    } else {
      res.send({
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const editUser = async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    postCode,
    residance,
    gender,
    availability,
    offerProvide,
    aboutMe,
    phoneNumber,
    streetOrHouseNumber,
  } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // const distance = "";

      user.image = image;
      user.firstName = firstName;
      user.lastName = lastName;
      user.postCode = postCode;
      user.residance = residance;
      user.streetOrHouseNumber = streetOrHouseNumber;
      user.gender = gender;
      user.availability = availability;
      user.offerProvide = offerProvide;
      user.aboutMe = aboutMe;
      user.phoneNumber = phoneNumber;
      // user.distance = distance;

      await user.save();

      res.status(200).send({
        data: user,
        message: "User updated successfully",
        status: 200,
      });
    } else {
      res.status(401).send({
        message: "There is no such user",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
};
