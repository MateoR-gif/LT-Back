const {logout, getAllConnectedUsers, disconectAll} = require('../controllers/connectedUsersController')
const router = require("express").Router()

router.delete('/connectedUsers', logout)

router.get('/connectedUsers', getAllConnectedUsers)

router.delete('/allConnectedUsers', disconectAll)

module.exports = router
