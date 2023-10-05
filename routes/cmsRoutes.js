const express = require("express");
const TokenMiddleware = require("../middleware/TokenMiddleware");
const { getCms, addCms } = require("../controllers/cmsControllers");

const router = express.Router();
router.get('/get-cms', getCms)
router.post('/add-cms', [TokenMiddleware()], addCms)

module.exports = router;