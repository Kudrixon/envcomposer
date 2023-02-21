const connection = require('../db/connection');

const getAllSemesters = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Semesters', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  getAllSemesters,
};
