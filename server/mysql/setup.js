const sequelize = require('../sequelize');

const reset = async () => {
  try {
    await sequelize.sync({ force: true });

    await sequelize.models.users.bulkCreate([
      {
        firstName: 'Philippe',
        lastName: 'Willot',
        email: '3684@holbertonschool.com',
        password: 'dfkdsfsd87Df',
        city: 'Valenciennes',
      },
      {
        firstName: 'Joël',
        lastName: 'Dumortier',
        email: '3233@holbertonschool.com',
        password: 'ieozj48dss6',
        city: 'Béthune',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@dohn.com',
        password: 'ozajezf599dza5',
        city: 'Paris',
      },
    ]);

    await sequelize.models.vegetables.bulkCreate([
      { name: 'Broccoli' },
      { name: 'Pommes de terre' },
      { name: 'Tomate' },
      { name: 'Chou' },
      { name: 'Poivron' },
      { name: 'Endive' },
    ]);

    await sequelize.models.userProduction.bulkCreate([
      { userId: 1, vegetableId: 2 },
      { userId: 2, vegetableId: 1 },
      { userId: 3, vegetableId: 3 },
    ]);

    await sequelize.models.trades.bulkCreate([
      { userProductionId_1: 1, userProductionId_2: 2 },
      { userProductionId_1: 1, userProductionId_2: 3 },
    ]);
  } catch (err) {
    console.error(err);
  }
};

reset();
