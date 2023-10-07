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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        contact_nubmer: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        blood_group: {
            type: DataTypes.ENUM('A', 'B', 'O', 'AB'),
            allowNull: false
        },
        blood_group_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'guest'),
            defaultValue: 'user',
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            // allowNull: false
        },
        verify: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            // allowNull: false
        },
    }, {
        tableName: 'users'
    });
    return User;
}