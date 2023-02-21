const Faculties = require('../models/faculties');

const getAllFaculties = async (req, res, next) => {
  try {
    const faculties = await Faculties.getAllFaculties();
    res.status(200).json({faculties: faculties.map(JSON.stringify)});
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllFaculties,
};
