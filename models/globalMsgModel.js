const mongoose = require('mongoose')

const globalMsgModel = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        timestamps:true,
        max: 20
    },
    from: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("globalMessages", globalMsgModel)