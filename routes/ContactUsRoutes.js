const express = require('express');
const router = express.Router();

const {postContactUs} = require("../controllers/ContactUs")

// router.get('/get-blog', getBlogPosts);
router.post('/post-contact-us', postContactUs);


module.exports = router;