module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'chat',
        //     key: 'id'
        // },
      },
      readBy: {
        type: DataTypes.STRING,
        // type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      tableName: "message",
    }
  );
  return Message;
};
