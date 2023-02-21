const express = require('express');
const CoursesController = require('../../controllers/coursesController');

const router = express.Router();

router.get('/', CoursesController.getAllCourses);
router.get('/:id/scripts', CoursesController.getCourseScriptnameById);


module.exports = router;
