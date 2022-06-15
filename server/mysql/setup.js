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
      { userId: 1, vegetableId: 2, description: '3kg en stock' },
      { userId: 1, vegetableId: 1, description: '10kg en stock' },
    ]);

    await sequelize.models.trades.bulkCreate([]);
  } catch (err) {
    console.error(err);
  }
})();
