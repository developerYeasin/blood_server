const db = require("../utils/database");

const Cms = db.cms;

const getCms = async (req, res) => {
    const jane = await Cms.findAll({})
    res.status(200).json({ error: false, result: jane })

}
const addCms = async (req, res) => {
    const { content_key, content_type, content_value, page } = req.body;


    try {
        const jane = Cms.build({
            content_key, content_type, content_value, page
        })
        await jane.save();
        res.status(200).json({ error: false, result: jane.toJSON() })
    } catch (error) {
        res.status(200).json({ error: true, message: error.message })
    }
}
const getOneCms = async (req, res) => {
    const data = await Cms.findOne({ where: { id: req.params.id } });
    res.status(200).json({ data: data });
}
const updateCms = async (req, res) => {
    const { firstName, lastName } = req.body;
    const data = await Cms.update({ firstName, lastName }, { where: { id: req.params.id } });
    res.status(200).json({ data: data });
}
const deleteCms = async (req, res) => {
    const data = await Cms.destroy({ where: { id: req.params.id } });
    res.status(200).json({ data: data });
}
module.exports = { getCms, addCms };