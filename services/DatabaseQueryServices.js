module.exports = class DatabaseQueryServices {
    async getOne(User, body) {
        try {
            const jane = await User.findOne({ where: { ...body }, attributes: { exclude: ['password'] } });
            // // console.log(jane)
            if (!jane) {
                throw new Error("dose not exist")
            } else {
                return jane.toJSON()
            }
        } catch (error) {
            return error.message
        }
    }
}