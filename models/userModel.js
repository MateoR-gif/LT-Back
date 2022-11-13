const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    isAvatarImageSet: {
        type: Boolean,
        dafult: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Users", userSchema)