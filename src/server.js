const cors = require('cors')
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const semestersRoutes = require('./api/routes/semestersRoutes');
const facultiesRoutes = require('./api/routes/facultiesRoutes');
const lecturersRoutes = require('./api/routes/lecturersRoutes');
const coursesRoutes = require('./api/routes/coursesRoutes');




app.use('/semesters', semestersRoutes);
app.use('/faculties', facultiesRoutes);
app.use('/lecturers', lecturersRoutes);
app.use('/courses', coursesRoutes);




// use other route files as needed

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
