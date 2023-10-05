const PasswordService = require("./PasswordService");

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
                    role: body.role
                })
                await jane.save();
                console.log(jane)
                return jane.toJSON()
            }
        } catch (error) {
            return error.message;
        }
    }
}