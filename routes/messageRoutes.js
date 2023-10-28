const express = require("express");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { sendMessage, getMessage, getMessageByChatId, updateMessageById, getMessageById } = require("../controllers/messageControllers");

//, [TokenMiddleware()]

const router = express.Router();
router.post('/message/send', [TokenMiddleware()], sendMessage)
router.get('/message/all', [TokenMiddleware()], getMessage)
router.get('/message/:chat_id', [TokenMiddleware()], getMessageByChatId)
router.get('/message/by/:id', [TokenMiddleware()], getMessageById)
router.put('/message/:id', [TokenMiddleware()], updateMessageById)

module.exports = router;