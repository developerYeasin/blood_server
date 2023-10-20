const config = require("../config");
const AuthServices = require("../services/AuthServices");
const DatabaseQueryServices = require("../services/DatabaseQueryServices");
const JwtServices = require("../services/JwtServices");
const { sendMail } = require("../services/MailServices");
const db = require("../utils/database");

const User = db.users;

const register = async (req, res) => {
    const { email, password, role, name, username } = req.body;
    if (!email || !password || !role || !name) {
        res.status(401).json({ error: true, message: "All the field required" })
        // throw new Error("All the field required")
    } else {

        const authservies = new AuthServices();
        const result = await authservies.register(User, req.body)
        console.log(result, "result")
        if (typeof result == "string") {
            return res.status(401).json({
                error: true,
                message: result
            });
        } else {
            const token = JwtServices.createAccessToken({ id: result.id, role: result.role }, config.token_expire, config.token_secret)
            res.status(200).json({
                error: false,
                user_id: result.id,
                token: token,
                role: result.role,
                expire_at: config.token_expire
            })
        }

    }
}

const updateUser = async (req, res) => {
    try {
        console.log(req.user_id)
        const { password } = req.body;
        if (password) {
            throw new Error("We can't edit password");
        }
        const data = await User.update(req.body, { where: { id: req.user_id } });
        res.status(200).json({ error: false, result: data[0] })
    } catch (error) {
        res.status(200).json({ error: false, message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({ error: true, message: "require email and message" })
    } else {

        const authservies = new AuthServices();
        const result = await authservies.login(User, req.body)
        // console.log(result)
        if (typeof result == "string") {
            return res.status(401).json({ error: true, message: result });
        } else {
            const token = JwtServices.createAccessToken({ id: result.id, role: result.role }, config.token_expire, config.token_secret)
            return res.status(200).json({ error: false, user_id: result.id, token: token, role: result.role, expire_at: config.token_expire });
        }


    }
}

const getUserInfo = async (req, res) => {
    console.log(req.user_id, "user_id")
    try {
        const databaseQuery = new DatabaseQueryServices();
        const result = await databaseQuery.getOne(User, { id: req.user_id })
        if (typeof result == "string") {
            return res.status(401).json({ error: true, message: "User dose not exist" });
        } else {
            res.status(200).json({ error: false, model: result })
        }
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}
const getUserById = async (req, res) => {
    // console.log(req.params.id, "req.params.id")
    try {
        const databaseQuery = new DatabaseQueryServices();
        const result = await databaseQuery.getOne(User, { id: req.params.id })
        if (typeof result == "string") {
            return res.status(401).json({ error: true, message: "User dose not exist" });
        } else {
            res.status(200).json({ error: false, model: result })
        }
    } catch (error) {
        res.status(401).json({ error: true, message: error.message })
    }
}


const forget = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(401).json({ error: true, message: "require email" })
    } else {

        const databaseQuery = new DatabaseQueryServices();
        const result = await databaseQuery.getOne(User, { email: req.body.email })
        if (typeof result == "string") {
            return res.status(401).json({ error: true, message: "User dose not exist" });
        } else {
            const authservies = new AuthServices();
            const forgetResult = await authservies.forget(email, result.id, db)
            const html = `please <a href="http://localhost:3000/reset?token=${forgetResult.token}" >Click here</a> <br/> and you this<br/> Code: ${forgetResult.code}`

            let payload = {
                from: "yea13sin@gmail.com",
                to: result.email,
                subject: "forget password",
                html: html,
            }
            const response = await sendMail(config, payload)
            return res.status(200).json({ error: false, message: "Email Sent", result: { token: forgetResult.token, code: forgetResult.code } });
        }
    }
}

const resetPassword = async (req, res) => {
    const { token, code, password } = req.body;
    if (!password) {
        return res.status(401).json({
            error: true,
            message: "Password is required"
        })
    }
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Invaild Token"
        })
    } else {
        const Token = db.token;
        const result = await Token.findOne({ where: { token: token } })
        if (!result) {
            return res.status(401).json({
                error: true,
                message: "Invaild Token"
            })
        } else if (result.code != code) {
            return res.status(401).json({
                error: true,
                message: "Invaild code"
            })
        }
        // console.log(result, "result")

        const authservies = new AuthServices();
        const resetResult = await authservies.reset(db, result, password)
        if (typeof resetResult == "string") {
            return res.status(401).json({ error: true, message: resetResult })
        } else {
            return res.status(201).json({ error: false, result: resetResult })
        }
    }

}


const check = async (req, res) => {
    try {
        if (!req.body.role) {
            return res.status(401).json({
                error: true,
                message: "UNAUTHORIZED",
                code: "UNAUTHORIZED"
            })
        } else if (req.body.role !== req.role) {
            return res.status(401).json({
                error: true,
                message: "UNAUTHORIZED",
                code: "UNAUTHORIZED"
            })
        }
        return res.status(200).json({ error: false, message: "OK" });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            error: true,
            message: error.message,
        });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({ where: req.query, attributes: { exclude: ['password'] } });
        if (users) {
            return res.status(200).json({
                error: false,
                list: users
            })
        } else {
            return res.status(401).json({
                error: true,
                message: "Something Wrong"
            })
        }

    } catch (error) {
        return res.status(401).json({
            error: true,
            message: error.message
        })
    }
}


module.exports = { login, register, forget, resetPassword, check, getAllUser, getUserInfo, updateUser, getUserById }