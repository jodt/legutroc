const express = require('express');
const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

const userRouter = express.Router();

// Checking if the user exists
userRouter.use('/:id', async (req, res, next) => {
  try {
    var id = getIdParam(req);
  } catch (err) {}

  const user = await models.users.findByPk(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(404).send({ status: 'User not found' });
  }
});

userRouter.get('/', async (req, res, next) => {
  res.send({ users: await models.users.findAll() });
});

userRouter.get('/:id', (req, res, next) => {
  res.send({ user: req.user });
});

userRouter.put('/:id', (req, res, next) => {
  if (req.body.password || req.body.city) {
  } else {
    res.status(400).send({ status: 'Body needs a new city or a password' });
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  await models.users.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).send();
});

module.exports = userRouter;
