const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');

const routers = {
  users: require('./routes/users'),
  vegetables: require('./routes/vegetables'),
  userProduction: require('./routes/userProduction'),
  trades: require('./routes/trades'),
};

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(errorhandler());

for (const [routerName, router] of Object.entries(routers)) {
  app.use(`/api/${routerName}`, router);
}

app.get('/api/status', (req, res, next) => {
  res.send({ status: 'OK' });
});

// session: {lastName, firstName, id} 200 - 400

app.post('/auth', (req, res, next) => {});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
