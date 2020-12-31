const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
    sliderImageLink: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    }
})

const SliderImages = mongoose.model("SliderImages", sliderImageSchema)

module.exports = SliderImages;