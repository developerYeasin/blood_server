const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4");
const resolvers = require("./resolvers.js");
const typeDefs = require("./types.js");
const JwtServices = require("../services/JwtServices.js");
const config = require("../config.js");

module.exports = async (app, db) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req }) => {
            // const token = req.headers.authorization;
            const token = JwtServices.getToken(req);
            console.log("token >> ",token)
            if (!token) {
                throw new Error('Invaid Token');
            }
            const result = JwtServices.verifyAccessToken(token, config.token_secret)
            if (!result) {
                throw new Error('TOKEN_EXPIRED');
            }
            console.log(result, "result")
            const user = {
                user_id: result.id,
                role: result.role
            }
            return { db, user };
        },
    }))
}