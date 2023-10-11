

const uploadToLocal = (req, res) => {
    try {
        res.status(200).json({ error: false, message: "Ok", url: req.file.filename })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })

    }
}

module.exports = { uploadToLocal };