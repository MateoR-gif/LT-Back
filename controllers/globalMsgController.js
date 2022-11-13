const globalMessages = require('../models/globalMsgModel')

module.exports.addGlobalMessage = async (req, res) => {
    try {
        const { message, from } = req.body
        const data = await globalMessages.create({
            message: message,
            from: from
        })
        if(data){
            return res.json({
                msg: "Mensaje Enviado con Éxito"
            })
        }
        return res.status(500).json({
            msg: "No se ha podido enviar el mensaje"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.getGlobalMessages = async (req, res) => {
    try {
        const messages = await globalMessages.find()
        if(messages){
            return res.json({
                ok: true,
                messages
            })
        }
        return res.status(500).json({
            ok: false,
            msg: "Hubo un problema consultando los mensajes globales"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteAllGlobalMessages = async (req, res) => {
    try {
        const response = await globalMessages.deleteMany()
        if(response.deletedCount === 0){
            res.status(404).json({
                ok: false,
                message: `No se encontraron mensajes para eliminar`
            })
        }
        return res.json({
            ok: true,
            message: `Se eliminaron ${response.deletedCount} mensajes`
        })
    } catch (error) {
        console.log(error)
    }
}