const db = require("../utils/database");

module.exports = function (option) {
    return function (req, res, next) {
        req.db = db
        next()
    }
}