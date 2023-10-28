

const CreateOrFetchChat = async (req, res) => {
    const { user } = req.body;
    // console.log(user, "user")
    if (!user) {
        return res.status(401).json({ error: true, message: "User id required" })
    }
    try {
        // { where: { users: req.body.users, creator: req.user_id } }
        const Chat = req.db.chat;
        const allChat = await Chat.findAll({ where: { isGroupChat: 0 } });
        let isExist = [];
        if (allChat) {
            allChat.map(item => {
                if (JSON.parse(item.users).includes(req.user_id) && JSON.parse(item.users).includes(req.body.user)) {
                    isExist.push(item)
                }
            })
        }
        // console.log(isExist, "isExist")

        if (isExist.length > 0) {
            return res.status(200).json({ error: false, model: isExist[0] })
        } else {

            const users = [user, req.user_id];
            const data = {
                "chatName": "Sender",
                "users": JSON.stringify(users),
                "latestMessage": 0,
                "isGroupChat": 0
            }
            const jane = await Chat.create({ ...data, creator: req.user_id })
            // console.log(jane, "jane")
            return res.status(200).json({ error: false, model: jane })
        }


    } catch (error) {
        return res.status(401).json({ error: true, message: error.message })
    }
}
const updateChatById = async (req, res) => {
    try {
        // console.log(req.params.id, 'req.params')
        const Chat = req.db.chat;
        const allChat = await Chat.update(req.body, {
            where: { id: Number(req.params.id) },
        });
        // console.log(allChat, "allChat")

        res.status(200).json({ error: false, message: allChat })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}
const getAll = async (req, res) => {
    try {
        const Chat = req.db.chat;
        const allChat = await Chat.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ]
        });

        let isExist = [];
        if (allChat) {
            allChat.map(item => {
                if (JSON.parse(item.users).includes(req.user_id)) {
                    isExist.push(item)
                }
            })
        }
        res.status(200).json({ error: false, list: isExist })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}
const getChatById = async (req, res) => {
    try {
        console.log(req.params.id, 'req.params')
        const Chat = req.db.chat;
        const allChat = await Chat.findOne({
            where: { id: Number(req.params.id) },
        });
        // console.log(allChat, "allChat")

        res.status(200).json({ error: false, model: allChat })
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}


module.exports = { CreateOrFetchChat, getAll, getChatById, updateChatById };