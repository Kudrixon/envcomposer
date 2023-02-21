const express = require('express');
const LecturersController = require('../../controllers/lecturersController');

const router = express.Router();

router.get('/', LecturersController.getAllLecturers);
router.get('/:facultyId', LecturersController.getLecturersByFacultyId);
router.get('/:lecturerId/course/:courseId/program', LecturersController.getLecturerProgramByLecturerIdCourseId);



module.exports = router;
