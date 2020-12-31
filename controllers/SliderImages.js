const SliderImages = require('../models/sliderImages');
const { cloudinary } = require("../Utils/cloudinary");

exports.getSliderImages = (req, res) => {
    try {
        SliderImages.find({}, function (err, documents) {
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
        console.log(err);
    }
}

exports.postSliderImages = async (req, res) => {
    const { sliderImageData } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(sliderImageData, {
        folder: "PlacementGuide/SliderImages"
    });
    let imgUrl = uploadResponse.secure_url;
    let cloudinaryId = uploadResponse.public_id;
    const sliderUrl = new SliderImages({
        sliderImageLink: imgUrl,
        cloudinaryId: cloudinaryId
    })
    try {
        await sliderUrl.save();
        SliderImages.find({}, function (err, document) {
            if (err) {
                res.json({
                    message: "Something went wrong"
                })
            }
            if (document) {
                res.json(document)
            }
            if (!document) {
                res.json({
                    message: "Data does not exists"
                })
            }
        })
    } catch (err) {
        res.send("error")
    }
}

exports.deleteSliderImage = async (req, res) => {
    const { id, cloudinaryId } = req.body;

    try {
        SliderImages.findByIdAndRemove(id, (err, document) => {
            if (err) {
                res.json({
                    message: "something wrong happened"
                })
            }
            cloudinary.uploader.destroy(cloudinaryId);
            SliderImages.find({}, function (err, doc) {
                if (err) {
                    res.json({
                        message: "something wrong happened"
                    })
                }
                if (doc) {
                    res.json(doc)
                }
            })
        });
    } catch (err) {
        res.send("error")
    }
}
