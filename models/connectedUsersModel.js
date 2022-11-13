const mongoose = require("mongoose")

const connectedUserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        unique: true
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