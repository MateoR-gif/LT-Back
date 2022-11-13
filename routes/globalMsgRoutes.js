const {addGlobalMessage, getGlobalMessages, deleteAllGlobalMessages} = require('../controllers/globalMsgController')
const router = require("express").Router()

router.post("/globalMsgs", addGlobalMessage)
router.get("/globalMsgs", getGlobalMessages)
router.delete("/allGlobalMessages", deleteAllGlobalMessages)

module.exports = router