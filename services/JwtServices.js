

const jwt = require('jsonwebtoken')

module.exports = {
    createAccessToken: function (payload, expireIn, secret) {
        return jwt.sign(payload, secret, {
            expiresIn: Number(expireIn),
            algorithm: "HS256"
        });
    },
    verifyAccessToken: function (token, key, option = {}) {
        try {
            const decoded = jwt.verify(token, key, option);
            return decoded;
        } catch (error) {
            console.log(error.message, "verifyAccessToken")
            return false
        }
    },
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            return req.headers.authorization.split(" ")[1];
        } else {
            return null;
        }
    }
}