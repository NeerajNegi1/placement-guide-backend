const express = require('express');
const router = express.Router();

const { getLogo, postLogo } = require("../controllers/ChangeLogo")

router.get('/get-logo', getLogo);
router.post('/change-logo', postLogo);

module.exports = router;