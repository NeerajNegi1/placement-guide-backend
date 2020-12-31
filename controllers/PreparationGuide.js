const PreparationGuide = require('../models/PreparationGuide');
const { cloudinary } = require("../Utils/cloudinary");

exports.getPreparationGuide = async (req, res) => {
    try {
        const preparationGuide = await PreparationGuide.find();
        res.json(preparationGuide);
    } catch (err) {
        console.log(err);
    }
}

exports.postPreparationGuide = async (req, res) => {
    try {
        const { imageData } = req.body;
        const uploadResponse = await cloudinary.uploader.upload(imageData, {
            folder: "PlacementGuide/PreparationGuide"
        });
        let imgUrl = uploadResponse.secure_url;
        let cloudinaryId = uploadResponse.public_id;
        let oldImage = "";
        if (uploadResponse) {
            const preparationguide = new PreparationGuide({
                link: imgUrl,
                cloudinaryId: cloudinaryId
            });
            PreparationGuide.find({}, function (err, document) {
                if (err) {
                    res.json({
                        message: "Something went wrong"
                    })
                }
                if (document.length === 0) {
                    return false;
                }
                if (document) {
                    oldImage = document[0].cloudinaryId;
                    return true
                }
            });
            cloudinary.uploader.destroy(oldImage);
            PreparationGuide.deleteMany({}, function (err) {
                if (err) {
                    console.log(err)
                }
            });
            const responseData = await preparationguide.save();
            res.json(responseData);
        }
    } catch (err) {
        res.send("error")
    }
}