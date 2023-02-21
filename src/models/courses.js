const connection = require('../db/connection');

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Courses', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getCourseScriptnameById = (courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT scriptname
    FROM courses
    WHERE id = ?
    `, [courseId], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  getCourseScriptnameById, getAllCourses
};
