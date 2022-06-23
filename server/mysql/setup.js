const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

(async () => {
  try {
    await sequelize.sync({ force: true });

    await sequelize.models.users.bulkCreate([
      {
        firstName: 'Philippe',
        lastName: 'Willot',
        email: '3684@holbertonschool.com',
        password: bcrypt.hashSync('philippe', 10),
        city: 'Valenciennes',
      },
      {
        firstName: 'Joël',
        lastName: 'Dumortier',
        email: '3233@holbertonschool.com',
        password: bcrypt.hashSync('joel', 10),
        city: 'Béthune',
      },
      {
        firstName: 'Marion',
        lastName: 'Declerck',
        email: 'mxrion.d@hotmail.com',
        password: bcrypt.hashSync('marion', 10),
        city: 'Beuvrages',
      },
    ]);

    await sequelize.models.vegetables.bulkCreate([
      { name: 'Broccoli', image: 'https://zupimages.net/up/22/24/locq.png' },
      {
        name: 'Pommes de terre',
        image: 'https://zupimages.net/up/22/24/n9r9.png',
      },
      { name: 'Tomate', image: 'https://zupimages.net/up/22/24/mto4.png' },
      { name: 'Chou', image: 'https://zupimages.net/up/22/24/8l18.png' },
      { name: 'Poivron', image: 'https://zupimages.net/up/22/24/wx0k.png' },
      { name: 'Endive', image: 'https://zupimages.net/up/22/24/xf63.png' },
    ]);

    await sequelize.models.userProduction.bulkCreate([
      { userId: 1, vegetableId: 1, description: '3kg de broccoli' },
      { userId: 1, vegetableId: 6, description: "1 kg d'endives" },
      { userId: 2, vegetableId: 2, description: '10kg de pommes de terres' },
      { userId: 3, vegetableId: 5, description: '2kg de poivrons' },
      { userId: 3, vegetableId: 4, description: '3 choux en stock' },
      { userId: 1, vegetableId: 4, description: '10 choux en stock' },
    ]);

    await sequelize.models.trades.bulkCreate([
      { userProductionId_1: 1, userProductionId_2: 4 },
      { userProductionId_1: 1, userProductionId_2: 3 },
      { userProductionId_1: 6, userProductionId_2: 3 },
    ]);
  } catch (err) {
    console.error(err);
  }
})();
