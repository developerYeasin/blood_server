module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
        chatName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isGroupChat: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        users: {
            type: DataTypes.STRING,
            allowNull: false,
            // type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        latestMessage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        groupAdmin: {
            type: DataTypes.INTEGER,

        },
        creator: {
            type: DataTypes.INTEGER,

        },
    }, {
        tableName: 'chat'
    });
    return Chat;
}