const Lecturers = require('../models/lecturers');

const getAllLecturers = async (req, res, next) => {
  try {
    const lecturers = await Lecturers.getAllLecturers();
    res.status(200).json({lecturers: lecturers.map(JSON.stringify)});
  } catch (err) {
    next(err);
  }
};


const getLecturersByFacultyId = async (req, res, next) => {
  try {
    const facultyId = req.params.facultyId;
    const lecturers = await Lecturers.getLecturersByFacultyId(facultyId);
    if (!lecturers || lecturers.length === 0) {
      return res.status(404).json({ message: "No lecturers found" });
    }
    res.status(200).json({ lecturers });
  } catch (err) {
    next(err);
  }
};


const getLecturerProgramByLecturerIdCourseId = async (req, res, next) => {
  try {
    const lecturerId = req.params.lecturerId;
    const courseId = req.params.courseId;

    const lecturers = await Lecturers.getLecturerProgramByLecturerIdCourseId(lecturerId, courseId);
    if (!lecturers || lecturers.length === 0) {
      return res.status(404).json({ message: "No program found" });
    }
    res.status(200).json({ lecturers });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllLecturers,
  getLecturersByFacultyId,
  getLecturerProgramByLecturerIdCourseId
};
