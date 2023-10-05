module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            // allowNull: false
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            // allowNull: false
        },
    }, {
        tableName: 'users'
    });
    return User;
}