const _ = require('lodash');
const Sequelize = require('sequelize');
const redis = require('../redis');

function baseFind(method, params, time) {
  const self = this;
  const dbName = this.sequelize.confit.database;
  const tableName = this.name;
  const redisKey = [dbName, tableName, JSON.stringify(params)].join(':');
  return (async function () {
    const cacheData = await redis.get(redisKey);
    if (!_.isEmpty(cacheData)) return JSON.parse(cacheData);

    const dbData = await self[method](params);
    if (_.isEmpty(dbData)) return {};

    redis.setex(redisKey, time || 3600, JSON.stringify(dbData));
    return dbData;
  })();
}

const Base = function (sequelize) {
  this.sequelize = sequelize;
}

Base.prototype.define = function (model, attributes, options) {
  const self = this;
  return this.sequelize.define(model, _.assign({
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
  }, attributes), _.defaultsDeep({
    classMethods: {
      findByIdCache(params, time) {
        this.sequelize = self.sequelize;
        return baseFind.call(this, 'findById', params, time);
      },
      findOneCache(params, time) {
        this.sequelize = self.sequelize;
        return baseFind.call(this, 'findOne', params, time);
      },
      findAllCache(params, time) {
        this.sequlize = self.sequelize;
        return baseFind.call(this, 'findAll', params, time);
      }
    }
  }, options));
};

module.exports = Base;