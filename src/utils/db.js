const { host, user, password, database, databasePort } = require('../config/config.js').database;
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

initialize();

async function initialize() {
  const connection = await mysql.createConnection({ host, databasePort, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // init models and add them to the exported db object
  db.User = require('../models/user.model.js')(sequelize);

  // sync all models with database
  await sequelize.sync();
}

module.exports = db = {};
