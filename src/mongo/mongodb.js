const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const demoDB = mongoose.createConnection('mongodb://127.0.0.1/demo', {});

module.exports = demoDB;