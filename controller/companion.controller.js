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
    if (companion) {
      companion.isOnline = !companion.isOnline;
      await companion.save();
      res.status(200).send({
        message: "Companion online status changed!",
        status: 200,
      });
    } else {
      res.status(404).send({
        message: "Companion not found",
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const searchCompanion = async (req, res) => {
  try {
    const { city, gender } = req.query;

    const filtering = [{ $match: { gender, city } }];

    const filteredCompanion = await Companion.aggregate(filtering);

    if (filteredCompanion.length > 0) {
      res.status(200).send(filteredCompanion);
    } else {
      res.status(401).send({
        message: "No matched companion",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteCompanion = async(req,res)=>{
  try {
    await Companion.findOneAndDelete({ _id: req.params.id })
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
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  addCompanion,
  getAllCompanion,
  changeOnlineStatus,
  searchCompanion,
  deleteCompanion
};
