const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database_name, config.user, config.password, {
    host: config.hostname,
    logging: false,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cms = require('../models/cms')(sequelize, DataTypes)
db.token = require('../models/token')(sequelize, DataTypes)
db.users = require('../models/user')(sequelize, DataTypes)

db.sequelize.sync({ force: false });
// , alter: true 

module.exports = db;