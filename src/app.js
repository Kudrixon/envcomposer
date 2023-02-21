// const cors = require('cors')
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require("body-parser");


// const app = express();
// app.use(bodyParser.json());


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'envcomposer'
// });

// app.use(cors({
//   origin: 'http://169.254.64.80:5500'
// }));


// app.get('/semesters', (req, res) => {
//   connection.query('SELECT * FROM Semesters', (error, semesters) => {
//     if (error) throw error;
//     res.send({semesters: semesters.map(JSON.stringify)});
//   });
// });

// app.get('/faculties', (req, res) => {
//   connection.query('SELECT * FROM Faculties', (error, faculties) => {
//     if (error) throw error;
//     res.send({ faculties: faculties.map(JSON.stringify) });
//   });
// });

// app.get('/lecturers', (req, res) => {
//   connection.query('SELECT * FROM Lecturers', (error, lecturers) => {
//     if (error) throw error;
//     let data = {};
//     res.send({ lecturers: lecturers.map(JSON.stringify) });
//   });
// });

// app.get('/lecturers/:facultyId', (req, res) => {
//   const facultyId = req.params.facultyId;

//   connection.query(`
//     SELECT l.id, l.name, l.surname, GROUP_CONCAT(f.name) AS faculties 
//     FROM lecturers l 
//     LEFT JOIN faculties_lecturers fl ON l.id = fl.lecturer_id 
//     LEFT JOIN faculties f ON fl.faculty_id = f.id 
//     WHERE fl.faculty_id = ?
//     GROUP BY l.id, l.name, l.surname
//   `, [facultyId], (error, results) => {
//     if (error) throw error;
//     res.send({ lecturers: results });
//   });
// });

// app.get('/courses', (req, res) => {
//   connection.query('SELECT * FROM Courses', (error, courses) => {
//     if (error) throw error;
//   res.send({ courses: courses.map(JSON.stringify) });
//   });
// });


// // Define a route that matches the /courses/:id/scriptname path pattern
// app.get('/courses/:id/scripts', (req, res) => {
//   const courseId = req.params.id;
//   const query = `
//   SELECT scriptname
//   FROM courses
//   WHERE id = ?
//   `;

//   connection.query(query, [courseId], (error, results) => {
//     if (error) {
//       res.status(500).send({ error });
//     } else {
//       res.send({ results: results.map(JSON.stringify) });
//     }
//   });
// });


// app.get('/lecturer/:lecturerId/course/:courseId/program', (req, res) => {
//   const lecturerId = req.params.lecturerId;
//   const courseId = req.params.courseId;

//   const query = `
//     SELECT programs.program_name, programs.link
//     FROM program_lecturer_course
//     JOIN programs ON program_lecturer_course.program_id = programs.id
//     WHERE program_lecturer_course.lecturer_id = ? AND program_lecturer_course.course_id = ?
//   `;

//   connection.query(query, [lecturerId, courseId], (error, results) => {
//     if (error) {
//       res.status(500).send({ error });
//     } else {
//       res.send(results);
//     }
//   });
// });


// app.get('/api/download/:system/:file', (req, res) => {
//   const filePath = path.join(__dirname, 'path/to/file');
//   const fileName = 'filename.extension';

//   const fileStream = fs.createReadStream(filePath);
//   res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
//   res.setHeader('Content-type', 'application/octet-stream');
//   fileStream.pipe(res);
// });


// app.post('/api/data', (req, res) => {
//   const data = req.body;
//   const selectedSemester = data.semester;
//   const selectedFaculty = data.faculty;
//   const selectedLecturer = data.lecturer;
//   const selectedCourse = data.course;

//   console.log(selectedSemester, selectedFaculty, selectedLecturer, selectedCourse);
  
//   // Do something with the received data here

//   res.status(200).send({ message: 'Data received' });
// });


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`API server is listening on port ${port}`);
// });

const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
