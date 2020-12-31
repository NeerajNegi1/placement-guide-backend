const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim:true,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminAuth: {
        type:Boolean,
        default:true
    },
    role: {
        type:String,
        default:"Temporary"
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;