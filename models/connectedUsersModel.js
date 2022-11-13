const mongoose = require("mongoose")

const connectedUserModel = new mongoose.Schema({
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
    connectedAt: {
        type: Date,
        default: Date.now
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

module.exports = mongoose.model("connectedUsers", connectedUserModel)