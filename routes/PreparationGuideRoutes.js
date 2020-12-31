const express = require('express');
const router = express.Router();

const { getPreparationGuide, postPreparationGuide } = require("../controllers/PreparationGuide")

router.get('/get-preparation-guide', getPreparationGuide);
router.post('/change-preparation-guide', postPreparationGuide);

module.exports = router;