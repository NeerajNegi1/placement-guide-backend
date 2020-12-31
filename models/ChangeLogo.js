const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    }
})

const Logo = mongoose.model("Logo", LogoSchema)

module.exports = Logo;