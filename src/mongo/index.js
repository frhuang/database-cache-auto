const UserModel = require('./userModel');

const action = async function () {
  const user = await UserModel.create({ name: 'node', age: 7, addr: 'nodejs.org' });
  const data1 = await UserModel.findByIdCache(user._id.toString());
  const data2 = await UserModel.findOneCache({ age: 7 });
  const data3 = await UserModel.findCache({ name: 'node', age: 7 }, 7200);
  return [data1, data2, data3];
};

action().then(console.log).catch(console.error);