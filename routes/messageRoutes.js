const express = require("express");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { sendMessage, getMessage, getMessageByChatId } = require("../controllers/messageControllers");

//, [TokenMiddleware()]

const router = express.Router();
router.post('/message/send', [TokenMiddleware()], sendMessage)
router.get('/message/all', getMessage)
router.get('/message/:chat_id', getMessageByChatId)

module.exports = router;