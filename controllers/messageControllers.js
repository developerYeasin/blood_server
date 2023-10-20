const sendMessage = async (req, res) => {
    try {
        const Message = req.db.message;
        const jane = await Message.create({ ...req.body })
        console.log(jane, "jane")
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
        console.log(jane, "jane")
        res.status(200).json({ error: false, list: jane })
    } catch (error) {
        console.log(error)
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
            // include: [{
            //     model: User,
            //     attributes: { exclude: ['password'] }
            // },
            // {
            //     model: Chat,
            // }
            // ],
            attributes: { exclude: ['password'] }
        })
        // console.log(jane, "jane")
        res.status(200).json({ error: false, list: jane })
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: true, message: error.message })
    }
}

module.exports = { sendMessage, getMessage, getMessageByChatId }