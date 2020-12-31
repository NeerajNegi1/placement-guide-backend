const express = require('express');
const router = express.Router();

const { getPlacedStudents, postPlacedStudents, deletePlacedStudents } = require("../controllers/PlacedStudents")

router.get('/placed-students', getPlacedStudents);
router.post('/placed-students', postPlacedStudents);
router.post('/delete-placed-students', deletePlacedStudents);


module.exports = router;