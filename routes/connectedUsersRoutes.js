const {logout, getAllConnectedUsers} = require('../controllers/connectedUsersController')
const router = require("express").Router()

router.delete('/connectedUsers', logout)

router.get('/connectedUsers', getAllConnectedUsers)

module.exports = router
