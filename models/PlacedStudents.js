const mongoose = require('mongoose');

const PlacedStudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    placedin: {
        type: String,
        required: true,
        uppercase: true
    },
    year: {
        type: Number,
        required: true
    },
    package: {
        type: String,
        required: true,
        uppercase: true
    },
    course: {
        type: String,
        required: true,
        uppercase: true
    }
})

const PlacedStudents = mongoose.model("PlacedStudents", PlacedStudentsSchema)

module.exports = PlacedStudents;