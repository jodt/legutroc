const express = require('express');
const { models } = require('../sequelize');
const app = express();

// Middlewares
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.json());

// Routers
app.use('/api/users', require('./routes/users'));
app.use('/api/vegetables', require('./routes/vegetables'));
app.use('/api/userProduction', require('./routes/userProduction'));
app.use('/api/trades', require('./routes/trades'));

// Status of API
app.get('/api/status', (req, res, next) => {
  res.send({ status: 'OK' });
});

// Check login credentials
app.post('/api/auth', async (req, res, next) => {
  try {
    const user = await models.users.findOne({ where: req.body });
    if (user) {
      res.status(200).send({ session: user });
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
