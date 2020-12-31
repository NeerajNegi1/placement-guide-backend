const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default:"Preparation Guide"
    }
})

const Blog = mongoose.model("Blog", BlogSchema)

module.exports = Blog;