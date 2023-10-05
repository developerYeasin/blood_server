const bcrypt = require('bcryptjs');

module.exports = {
    hash: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    compareHash: async (password, hashPassword) => {
        return await bcrypt.compare(password, hashPassword)
    }
}