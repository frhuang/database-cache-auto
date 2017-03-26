const UserModel = require('./mysqlUser');

const action = async function () {
  await UserModel.sync({ force: true });
  const user = await UserModel.create({ name: 'node', age: 7, addr: 'nodejs.org' });
  await UserModel.findByIdCache(user.id);
  await UserModel.findOneCache({ where: { age: 7 }});
  await UserModel.findAllCache({ where: { name: 'node', age: 7 }}, 7200);
  return 'finish';
}

action().then(console.log).catch(consle.error);