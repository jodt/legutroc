const sequelize = require('../sequelize');

const reset = async () => {
  try {
    await sequelize.sync({ force: true });

    await sequelize.models.users.bulkCreate([
      {
        firstName: 'Philippe',
        lastName: 'Willot',
        email: '3684@holbertonschool.com',
        password: 'test1234',
        city: 'Beuvrages',
      },
      {
        firstName: 'Joël',
        lastName: 'Dumortier',
        email: '3233@holbertonschool.com',
        password: 'motdepasse',
        city: 'Béthune',
      },
    ]);

    await sequelize.models.vegetables.bulkCreate([
      { name: 'Apple' },
      { name: 'Orange' },
    ]);

    await sequelize.models.userProduction.bulkCreate([
      { userId: 1, vegetableId: 2 },
      { userId: 2, vegetableId: 1 },
    ]);

    await sequelize.models.trades.bulkCreate([
      { userProductionId_1: 2, userProductionId_2: 1 },
    ]);
  } catch (err) {
    console.error(err);
  }
};

reset();
