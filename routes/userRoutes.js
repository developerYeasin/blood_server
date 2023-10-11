const express = require("express");
const { login, register, check, forget, resetPassword, getAllUser, getUserInfo } = require("../controllers/userControllers");
const TokenMiddleware = require("../middleware/TokenMiddleware");

const router = express.Router();
router.route('/register').post(register)
router.post('/login', login)
router.get('/get-user/:token', [TokenMiddleware()], getUserInfo)
router.post('/forget', forget)
router.post('/reset', resetPassword)
router.post('/check', [TokenMiddleware()], check)
router.get('/all-user', getAllUser)

module.exports = router;
