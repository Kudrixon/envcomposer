const express = require('express');
const FacultiesController = require('../../controllers/facultiesController');

const router = express.Router();

router.get('/', FacultiesController.getAllFaculties);

module.exports = router;
