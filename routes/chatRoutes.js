const express = require("express");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { CreateOrFetchChat, getAll, getChatById, updateChatById } = require("../controllers/chatControllers");

const router = express.Router();
router.post('/chat', [TokenMiddleware()], CreateOrFetchChat)
router.put('/update/chat/:id', [TokenMiddleware()], updateChatById)
router.get('/chat/get-all', [TokenMiddleware()], getAll)
router.get('/chat/:id', [TokenMiddleware()], getChatById)

module.exports = router;