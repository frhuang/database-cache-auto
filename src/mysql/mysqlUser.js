const Sequelize = require('sequelize');
const base = require('./mysqlBase');
const sequelize = require('./mysql');

const Base = new base(sequelize);

module.exports = Base.define('user', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  addr: Sequelize.STRING
}, {
  tableName: 'user',
  timestamps: true
})