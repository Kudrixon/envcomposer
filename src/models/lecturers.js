const connection = require('../db/connection');

const getAllLecturers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Lecturers', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getLecturersByFacultyId = (facultyId) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      SELECT l.id, l.name, l.surname, GROUP_CONCAT(f.name) AS faculties 
      FROM lecturers l 
      LEFT JOIN faculties_lecturers fl ON l.id = fl.lecturer_id 
      LEFT JOIN faculties f ON fl.faculty_id = f.id 
      WHERE fl.faculty_id = ?
      GROUP BY l.id, l.name, l.surname
    `, [facultyId], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getLecturerProgramByLecturerIdCourseId = (lecturerId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      SELECT programs.program_name, programs.link
      FROM program_lecturer_course
      JOIN programs ON program_lecturer_course.program_id = programs.id
      WHERE program_lecturer_course.lecturer_id = ? AND program_lecturer_course.course_id = ?
    `, [lecturerId, courseId], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};


module.exports = {
  getAllLecturers,
  getLecturersByFacultyId,
  getLecturerProgramByLecturerIdCourseId
};
