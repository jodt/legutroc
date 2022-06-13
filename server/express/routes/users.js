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

// Update an user dynamically
userRouter.use('/:id/*', async (req, res, next) => {
  const user = req.user;
  const dataToUpdate = req.params[0];

  if (!(dataToUpdate in req.body)) {
    return res
      .status(400)
      .send({ status: `missing ${dataToUpdate} in the body` });
  }

  if (user.dataValues[dataToUpdate] === req.body[dataToUpdate]) {
    return res
      .status(400)
      .send({ status: `You can't use your previous ${dataToUpdate}` });
  } else {
    try {
      const dataObject = {};
      dataObject[dataToUpdate] = req.body[dataToUpdate];
      await models.users.update(dataObject, {
        where: { id: req.params.id },
      });
    } catch (err) {
      console.error(err);
    }
    next();
  }
});

userRouter.get('/', async (req, res, next) => {
  res.send({ users: await models.users.findAll() });
});

userRouter.get('/:id', (req, res, next) => {
  res.send({ user: req.user });
});

userRouter.put('/:id/password', (req, res, next) => {
  res.status(200).send();
});

userRouter.put('/:id/city', (req, res, next) => {
  res.status(200).send();
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    await models.users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
  }
});

module.exports = userRouter;
