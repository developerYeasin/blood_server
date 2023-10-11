const express = require("express");
const { uploadToLocal } = require("../controllers/uploadControllers");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});


const upload = multer({ storage: storage })

const router = express.Router();
router.post('/upload', upload.single('file'), uploadToLocal)

module.exports = router;