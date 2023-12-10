exports.getAllChat = async (parent, _, { db }) => {
    const Chat = db.chat;
    const allChat = await Chat.findAll({
        order: [
            ['updatedAt', 'DESC'],
        ]
    });
    // console.log(allChat, "Chat")

    return allChat
}
exports.getUser = async (chat, _, { db }) => {
    // const User = db.users;
    const sequelize = db.sequelize;
    const Sequelize = db.Sequelize;
    let users = []
    console.log(JSON.parse(chat.users), "JSON.parse(chat.users)")
    for (let id of JSON.parse(chat.users)) {
        const user = await sequelize.query(`SELECT * FROM users WHERE id =${id}`, { type: Sequelize.QueryTypes.SELECT });
        // console.log(user, "user")
        users.push(user[0])
    }
    // console.log(users, "user")

    return users
}