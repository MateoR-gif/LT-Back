const connectedUsers = require("../models/connectedUsersModel")

module.exports.logout = async (req, res) => {
    try {
        const { username } = req.body
        console.log(username)
        const validateUserName = await connectedUsers.findOne({ username })
        console.log(validateUserName)
        if (!validateUserName) {
            return res.status(500).json({
                msg: "El usuario no está logeado",
                ok: false
            })
        }
        await connectedUsers.deleteOne({ username })
        return res.json({
            ok: true,
            msg: 'Usuario deslogueado'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllConnectedUsers = async (req, res) => {
    try {
        const users = await connectedUsers.find()
        if (users) {
            return res.json({
                ok: true,
                users
            })
        }
        return res.status(500).json({
            ok: false,
            msg: "Hubo un problema consultando los usuarios conectados"
        })
    } catch (error) {
        console.log(error)
    }
}
