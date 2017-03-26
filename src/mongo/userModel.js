const BaseSchema = require('./mongoBase');
const mongoDB = require('./mongodb');

const userSchema = BaseSchema.extend({
  name: String,
  age: Number,
  addr: String
});

const user = mongoDB.model('User', userSchema, 'user');

module.exports = user;