module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // last_name: {
      //     type: DataTypes.STRING,
      //     // allowNull: false
      // },
      username: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      contact_number: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      address_sec: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      subscription: {
        type: DataTypes.TEXT,
        // allowNull: false
      },
      blood_group: {
        type: DataTypes.ENUM("a", "b", "o", "ab", "a-", "b-", "o-", "ab-"),
        allowNull: false,
      },
      // blood_group_type: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false
      // },
      last_blood_donate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      next_blood_donate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      profile: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      cover: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
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
      added_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        // allowNull: false
      },
      is_active: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        // allowNull: false
      },
    },
    {
      tableName: "users",
    }
  );
  return User;
};
