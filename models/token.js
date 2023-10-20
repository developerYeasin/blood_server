module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("Token", {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: false,
            // allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: false,
            // allowNull: false
        },
        expire_at: {
            type: DataTypes.STRING,
            defaultValue: false,
            // allowNull: false
        },
    }, {
        tableName: 'token'
    });
    return Token;
}