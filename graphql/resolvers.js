const { default: axios } = require("axios")
const { getAllChat, getUser, getMessage } = require("./chat/getChat")
const { GraphQLDateTime, GraphQLDate } = require('graphql-iso-date');

module.exports = {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
    Chat: {
        user: getUser,
        message: getMessage,
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