const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');
const { models } = require('../sequelize');

const routers = {
  users: require('./routes/users'),
  vegetables: require('./routes/vegetables'),
  userProduction: require('./routes/userProduction'),
  trades: require('./routes/trades'),
};

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(errorhandler());

for (const [routerName, router] of Object.entries(routers)) {
  app.use(`/api/${routerName}`, router);
}

app.get('/api/status', (req, res, next) => {
  res.send({ status: 'OK' });
});

app.post('/api/auth', async (req, res, next) => {
  try {
    const user = await models.users.findOne({ where: req.body });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send({ message: 'Incorrect credentials' });
    }
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
