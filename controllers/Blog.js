const Blog = require('../models/Blog');
const { cloudinary } = require("../Utils/cloudinary");

exports.getBlogPosts = async (req, res) => {
    try {
        const blog = await Blog.find()
        res.json(blog)
    } catch (err) {
        console.log(err);
    }
}

exports.postBlogPosts = async (req, res) => {
    const { title, description, postImage, content, category } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(postImage, {
        folder: "PlacementGuide/blog-images"
    });
    let imgUrl = uploadResponse.secure_url;
    let cloudinaryId = uploadResponse.public_id;
    const blog = new Blog({
        title: title,
        description: description,
        postImage: imgUrl,
        cloudinaryId: cloudinaryId,
        content: content,
        category: category
    })
    try {
        await blog.save();
        Blog.find({}, function (err, documents) {
            if (err) {
                res.json({
                    message: "Something went wrong"
                })
            }
            if (!documents) {
                res.json({
                    message: "Data does not exists"
                })
            }
            if (documents) {
                res.json(documents);
            }
        })
    } catch (err) {
        res.send("error")
    }
}