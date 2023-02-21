const Semesters = require('../models/semesters');

const getAllSemesters = async (req, res, next) => {
  try {
    const semesters = await Semesters.getAllSemesters();
    res.status(200).json({semesters: semesters.map(JSON.stringify)});
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllSemesters,
};
