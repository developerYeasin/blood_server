const sendMessage = async (req, res) => {
    try {
        const Message = req.db.message;
        const jane = await Message.create({ ...req.body })
        // console.log(jane, "jane")
        res.status(200).json({ error: false, message: jane })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}
const updateMessageById = async (req, res) => {
    try {
        const Message = req.db.message;
        const jane = await Message.update(req.body, { where: { id: Number(req.params.id) } })
        // console.log(jane, "jane")
        res.status(200).json({ error: false, message: jane })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}
const getMessage = async (req, res) => {
    try {
        const Message = req.db.message;
        const User = req.db.users;
        const Chat = req.db.chat;

        const jane = await Message.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            },
            {
                model: Chat,
            }
            ],
            attributes: { exclude: ['password'] }
        })
        // console.log(jane, "jane")
        res.status(200).json({ error: false, list: jane })
    } catch (error) {
        // console.log(error)
        res.status(401).json({ error: true, message: error.message })
    }
}
const getMessageByChatId = async (req, res) => {
    const { chat_id } = req.params;
    try {
        const Message = req.db.message;
        const User = req.db.users;
        const Chat = req.db.chat;

        const jane = await Message.findAll({
            where: { chat: chat_id },
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            },
            {
                model: Chat,
            }
            ],
            attributes: { exclude: ['password'] }
        })
        // // console.log(jane, "jane")
        res.status(200).json({ error: false, list: jane })
    } catch (error) {
        // console.log(error)
        res.status(401).json({ error: true, message: error.message })
    }
}
const getMessageById = async (req, res) => {
    const { id } = req.params;
    console.log(id, "id")
    try {
        const Message = req.db.message;
        const User = req.db.users;
        const Chat = req.db.chat;

        const jane = await Message.findOne({
            where: { id: id },
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            },
            {
                model: Chat,
            }
            ],
            attributes: { exclude: ['password'] }
        })
        console.log(jane, "jane")
        res.status(200).json({ error: false, model: jane })
    } catch (error) {
        // console.log(error)
        res.status(401).json({ error: true, message: error.message })
    }
}

module.exports = { sendMessage, getMessage, getMessageByChatId, updateMessageById, getMessageById }