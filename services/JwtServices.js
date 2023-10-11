

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
        } else if (req.params.token) {
            return req.params.token;
        } else {
            return null;
        }
    },
    generateString: function (length) {
        let d = new Date().getTime();
        const time = new Date().getTime();
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        })
        return (uuid.toUpperCase() + "-" + time.toString()).substring(0, length);
    }

}