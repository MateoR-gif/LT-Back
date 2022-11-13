const User = require("../models/userModel")
const connectedUser = require("../models/connectedUsersModel")
const bycrypt = require("bcrypt")

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const validateUserName = await User.findOne({ username })
        if (validateUserName) {
            return res.status(500).json({
                msg: "El nombre de usuario ya existe",
                ok: false
            })
        }
        const validateEmail = await User.findOne({ email })
        if (validateEmail) {
            return res.status(500).json({
                msg: "El correo ya existe",
                ok: false
            })
        }
        const encryptedPassword = await bycrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: encryptedPassword
        })
        delete user.password
        return res.json({
            msg: "Usuario Creado",
            ok: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({
                msg: "Correo o Contraseña Incorrectos",
                ok: false
            })
        }
        const validatePassword = await bycrypt.compare(password, user.password)
        if (!validatePassword) {
            return res.status(500).json({
                msg: "Correo o Contraseña Incorrectos",
                ok: false
            })
        }
        delete user.password
        const conectar = await connectedUser.create({
            username: user.username
        })
        return res.json({
            msg: "Logged Succesfully",
            ok: true,
            user: user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ya se encuentra conectado",
            ok: false
        })
    }
}