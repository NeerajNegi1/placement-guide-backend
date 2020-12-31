const express = require('express');
const router = express.Router();

const {getBlogPosts, postBlogPosts} = require("../controllers/Blog")

router.get('/get-blog', getBlogPosts);
router.post('/post-blog', postBlogPosts);


module.exports = router;