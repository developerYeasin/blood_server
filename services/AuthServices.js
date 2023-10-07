const JwtServices = require("./JwtServices");
const PasswordService = require("./PasswordService");
const { sqlDateTimeFormat } = require("./UtilsServices");



module.exports = class AuthServices {
    async login(User, body) {
        try {
            const jane = await User.findOne({ where: { email: body.email } });
            // console.log(jane)
            if (!jane) {
                throw new Error("User dose not exist")
            } else {
                // console.log({ id: jane.id, email: jane.email })
                const passwordValid = await PasswordService.compareHash(body.password, jane.password)
                console.log(passwordValid, "passwordValid")
                if (!passwordValid) {
                    throw new Error("Invalid Password")
                }
                return jane.toJSON()
            }
        } catch (error) {
            return error.message
        }
    }
    async register(User, body) {

        try {
            const exist = await User.findOne({ where: { email: body.email } })
            // console.log(exist, "exist")
            if (exist) {
                throw new Error("User exists");
            } else {
                const hashPassword = await PasswordService.hash(body.password);
                console.log(hashPassword, "hashPassword")
                const jane = User.build({
                    password: hashPassword,
                    email: body.email,
                    first_name: body.first_name,
                    last_name: body.last_name,
                    role: body.role,
                    username: body.username,
                    blood_group: body.blood_group,
                    blood_group_type: body.blood_group_type,
                    status: body.status,
                    number: body.number,
                })
                await jane.save();
                console.log(jane)
                return jane.toJSON()
            }
        } catch (error) {
            return error.message;
        }
    }
    async forget(email, userId, db) {
        const Token = db.token;
        let tomorrow = new Date();
        tomorrow.setHours(new Date().getHours() + 1);
        const code = Math.floor(Math.random() * 1000000);
        const token = JwtServices.generateString(50)
        const payload = {
            code: code,
            token: token,
            type: 0,
            data: '{"email": "' + email + '", "token": "' + token + '", "code": "' + code + '"}',
            user_id: userId,
            status: 1,
            expire_at: sqlDateTimeFormat(tomorrow),
        }
        const result = await Token.create(payload)
        return { ...payload, code, token: token }
    }
    async reset(db, result, password) {
        const Token = db.token;
        const User = db.users;
        try {
            const exist = await User.findOne({ where: { id: result.user_id } });
            if (exist) {
                const hashPassword = await PasswordService.hash(password);
                const data = await User.update({ password: hashPassword }, { where: { id: exist.id } });
                if (data) {
                    await Token.destroy({ where: { id: result.id } });
                    return data[0];
                } else {
                    throw new Error("Password Update Failed")
                }
            } else {
                throw new Error("Invaild User")
            }
        } catch (error) {
            console.log(error, 'error')
            return error.message
        }

    }
}