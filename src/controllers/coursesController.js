const Courses = require('../models/courses');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Courses.getAllCourses();
    res.status(200).json({courses: courses.map(JSON.stringify)});
  } catch (err) {
    next(err);
  }
};


const getCourseScriptnameById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const results = await Courses.getCourseScriptnameById(courseId);
    res.send({results: results.map(JSON.stringify)});
  } catch (error) {
    res.status(500).send({ error });
  }
};


module.exports = { getCourseScriptnameById, getAllCourses};
