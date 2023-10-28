const express = require("express");
const { uploadToLocal, uploadBase64ToImageKit } = require("../controllers/uploadControllers");
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
router.post('/upload/base64', uploadBase64ToImageKit)

module.exports = router;