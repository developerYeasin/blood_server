const config = require("../config");
const JwtServices = require("../services/JwtServices")

module.exports = function (option) {
    return function (req, res, next) {
        const token = JwtServices.getToken(req);

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "UNAUTHORIZED",
                code: "UNAUTHORIZED"
            })
        } else {
            const result = JwtServices.verifyAccessToken(token, config.token_secret, option)
            console.log(result, "re")
            if (!result) {
                return res.status(401).json({
                    error: true,
                    message: "TOKEN_EXPIRED",
                    code: "TOKEN_EXPIRED"
                })
            } else {
                req.user_id = result.id;
                req.role = result.role;
                next()
            }
        }
    }
}