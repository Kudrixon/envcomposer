const connection = require('../db/connection');

const getAllFaculties = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Faculties', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  getAllFaculties,
};
