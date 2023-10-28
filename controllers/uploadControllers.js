const { imagekit } = require("../services/ImageKitServices")


const uploadToLocal = (req, res) => {
    try {
        res.status(200).json({ error: false, message: "Ok", url: req.file.filename })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })

    }
}
const uploadBase64ToImageKit = async (req, res) => {
    try {
        if (!req.body.base64) {
            throw new Error("you have submit with base64")
        }
        const result = await imagekit.upload({
            file: req.body.base64, //required
            fileName: "blood_donors.jpg",
        })
        res.status(200).json({ error: false, message: "Ok", url: result })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })

    }
}

module.exports = { uploadToLocal, uploadBase64ToImageKit };