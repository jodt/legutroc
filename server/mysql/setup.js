const sequelize = require('../sequelize');

(async () => {
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
        firstName: 'Marion',
        lastName: 'Declerck',
        email: 'mxrion.d@hotmail.com',
        password: 'uiaziaeropez778',
        city: 'Beuvrages',
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
      { userId: 1, vegetableId: 1, description: '3kg de broccoli' },
      { userId: 1, vegetableId: 6, description: "1 kg d'endives" },
      { userId: 2, vegetableId: 2, description: '10kg de pommes de terres' },
      { userId: 3, vegetableId: 5, description: '2kg de poivrons' },
      { userId: 3, vegetableId: 4, description: '3 choux en stock' },
    ]);

    await sequelize.models.trades.bulkCreate([
      { userProductionId_1: 1, userProductionId_2: 2 },
      { userProductionId_1: 1, userProductionId_2: 3 },
    ]);
  } catch (err) {
    console.error(err);
  }
})();
