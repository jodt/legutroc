const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('legutroc', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  logQueryParameters: true,
  benchmark: true,
});

const modelDefiners = [
  require('./models/users.model'),
  require('./models/vegetables.model'),
  require('./models/userProduction.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = sequelize;
