const Companion = require("../models/companion.model");

const addCompanion = async (req, res) => {
  try {
    const newCompanion = new Companion(req.body);
    const companion = await newCompanion.save();

    res.status(200).send({
      message: "Companion added successfully!",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getAllCompanion = async (req, res) => {
  try {
    const companions = await Companion.find({});
    res.status(200).send(companions);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const changeOnlineStatus = async (req, res) => {
  try {
    const companion = await Companion.findById(req.params.id);
    
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = { addCompanion, getAllCompanion, changeOnlineStatus };
