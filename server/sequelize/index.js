const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize('legutroc', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

const modelDefiners = [
  require('./models/users.model'),
  require('./models/vegetables.model'),
  require('./models/userProduction.model'),
  require('./models/trades.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
