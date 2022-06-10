const sequelize = require('../sequelize');

const reset = async () => {
  console.log('Recreating the tables and adding random data');

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
};

reset();
