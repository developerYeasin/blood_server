const express = require("express");
const { login, register, check, forget, resetPassword } = require("../controllers/userControllers");
const TokenMiddleware = require("../middleware/TokenMiddleware");

const router = express.Router();
router.route('/register').post(register)
router.post('/login', login)
router.post('/forget', forget)
router.post('/reset', resetPassword)
router.post('/check', [TokenMiddleware()], check)

module.exports = router;
