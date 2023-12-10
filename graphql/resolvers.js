const { default: axios } = require("axios")
const { getAllChat, getUser } = require("./chat/getChat")

module.exports = {
    Chat: {
        user: getUser,
    },
    Query: {
        getAllChat: getAllChat,
    },
    Mutation: {
        postUser: (_, data) => {
            console.log(data, "Data")
            return data
        }
    }
}