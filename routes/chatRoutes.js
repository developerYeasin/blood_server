const express = require("express");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { CreateOrFetchChat, getAll } = require("../controllers/chatControllers");

const router = express.Router();
router.post('/chat', [TokenMiddleware()], CreateOrFetchChat)
router.get('/chat/get-all', [TokenMiddleware()], getAll)

module.exports = router;