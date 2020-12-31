const Logo = require('../models/ChangeLogo');
const { cloudinary } = require("../Utils/cloudinary");

exports.getLogo = async (req, res) => {
    try {
        const logo = await Logo.find()
        res.json(logo)
    } catch (err) {
        console.log(err);
    }
}

exports.postLogo = async (req, res) => {
    try {
        const { imageData } = req.body;
        const uploadResponse = await cloudinary.uploader.upload(imageData, {
            folder: "PlacementGuide/Logo"
        });
        let imgUrl = uploadResponse.secure_url;
        let cloudinaryId = uploadResponse.public_id;
        let oldImage = "";
        if (uploadResponse) {
            const logo = new Logo({
                link: imgUrl,
                cloudinaryId: cloudinaryId
            });
            Logo.find({}, function (err, document) {
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
                    cloudinary.uploader.destroy(oldImage);
                }
            });
            Logo.deleteMany({}, async function (err) {
                if (err) {
                    console.log(err)
                }
            });
            const responseData = await logo.save();
            res.json(responseData);
        }
    } catch (err) {
        res.send("error")
    }
}