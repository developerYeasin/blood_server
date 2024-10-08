const express = require("express");
const {
  login,
  register,
  check,
  forget,
  resetPassword,
  getAllUser,
  getUserInfo,
  updateUser,
  getUserById,
  saveSubscription,
  updateIsActive,
} = require("../controllers/userControllers");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { sendPushNoti } = require("../controllers/messageControllers");

const router = express.Router();
router.route("/register").post(register);
router.post("/login", login);
router.get("/get-user/:token", [TokenMiddleware()], getUserInfo);
router.get("/get/user/:id", [TokenMiddleware()], getUserById);
router.put("/update-user", [TokenMiddleware()], updateUser);
router.post("/forget", forget);
router.post("/reset", resetPassword);
router.post("/check", [TokenMiddleware()], check);
router.post("/all-user", getAllUser);
router.post(
  "/save/subscription/notification",
  [TokenMiddleware()],
  saveSubscription
);
router.post("/send/notificaion", [TokenMiddleware()], sendPushNoti);

router.post("/api/update-status", [TokenMiddleware()], updateIsActive);

module.exports = router;
