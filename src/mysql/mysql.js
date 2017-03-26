const Sequelize = require('sequelize');
const _ = require('lodash');
const redis = require('../redis');

const setCache = function (data) {
  if (_.isEmpty(data) || !data.id) return;

  const dbName = data.$modelOptions.sequlize.config.database;
  const tableName = data.$modelOptions.tableName;
  const redisKey = [dbName, tableName, JSON.stringify(data.id)].join(':');
  redis.setex(redisKey, 3600, JSON.stringify(data.toJSON()));
};

const sequelize = new Sequelize('demo', 'root', '', {
  host: 'localhost', 
  port: 3306,
  hooks: {
    afterUpdate(data) {
      setCache(data);
    },
    afterCreate(data) {
      setCache(data);
    }
  }
});

sequelize.authenticate()
  .then(function () {
    console.log('connection has been established successfully');
  })
  .catch(function (err) {
    console.error('unable to connect to the database:', err);
  });

  module.exports = sequelize;