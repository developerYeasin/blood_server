const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.database_name,
  config.user,
  config.password,
  {
    host: config.hostname,
    logging: false,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cms = require("../models/cms")(sequelize, DataTypes);
db.token = require("../models/token")(sequelize, DataTypes);
db.users = require("../models/user")(sequelize, DataTypes);
db.chat = require("../models/chat")(sequelize, DataTypes);
db.message = require("../models/message")(sequelize, DataTypes);

db.users.hasOne(db.message, {
  foreignKey: "id",
});
db.message.belongsTo(db.users, {
  foreignKey: "sender",
});
db.chat.hasOne(db.message, {
  foreignKey: "id",
});
db.message.belongsTo(db.chat, {
  foreignKey: "chat",
});

// db.sequelize.sync({ force: true });
// , alter: true
db.sequelize.sync({ alter: true });

module.exports = db;
