const config = require("../config");
const AuthServices = require("../services/AuthServices");
const DatabaseQueryServices = require("../services/DatabaseQueryServices");
const JwtServices = require("../services/JwtServices");
const { sendMail } = require("../services/MailServices");
const db = require("../utils/database");

const User = db.users;

const register = async (req, res) => {
    const { email, password, role, first_name } = req.body;
    if (!email || !password || !role || !first_name) {
        res.status(400).json({ error: true, message: "All the field required" })
        // throw new Error("All the field required")
    } else {

        const authservies = new AuthServices();
        const result = await authservies.register(User, req.body)
        console.log(result, "result")
        if (typeof result == "string") {
            return res.status(403).json({
                error: true,
                message: result
            });
        } else {
            res.status(200).json({
                error: false,
                result: result
            })
        }

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
            const token = JwtServices.createAccessToken({ id: result.id, role: result.role }, 3600, "yeasin")
            return res.status(200).json({ error: false, result: { ...result, token: token } });
        }


    }
}
const forget = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(401).json({ error: true, message: "require email" })
    } else {

        const databaseQuery = new DatabaseQueryServices();
        const result = await databaseQuery.getOne(User, { email: req.body.email })
        console.log(result)
        if (typeof result == "string") {
            return res.status(401).json({ error: true, message: "User dose not exist" });
        } else {
            let payload = {
                from: "yea13sin@gmail.com",
                to: 'mdyeasina40@gmail.com',
                subject: "forget password",
                html: "this user forget  his password",
            }
            const response = await sendMail(config, payload)
            console.log(response, "send mail")
            return res.status(200).json({ error: false, result: result });
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


module.exports = { login, register, forget, check }