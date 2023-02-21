const express = require('express');
const SemestersController = require('../../controllers/semestersController');

const router = express.Router();

router.get('/', SemestersController.getAllSemesters);

module.exports = router;
