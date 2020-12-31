const mongoose = require('mongoose');

const PreparationGuideSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    }
})

const PreparationGuide = mongoose.model("PreparationGuide", PreparationGuideSchema)

module.exports = PreparationGuide;