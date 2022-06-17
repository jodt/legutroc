const express = require('express');
const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

const userRouter = express.Router();

// Checking if the user exists
userRouter.use('/:id', async (req, res, next) => {
  try {
    const id = getIdParam(req, res);
    const user = await models.users.findByPk(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(400).send({ message: `Invalid id param` });
  }
});

// Update an user dynamically
userRouter.use('/:id/*', async (req, res, next) => {
  const user = req.user;
  const dataToUpdate = req.params[0];

  if (!(dataToUpdate in req.body)) {
    return res
      .status(400)
      .send({ message: `missing ${dataToUpdate} in the body` });
  }

  if (user.dataValues[dataToUpdate] === req.body[dataToUpdate]) {
    return res
      .status(400)
      .send({ message: `You can't use your previous ${dataToUpdate}` });
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
  res.status(200).send({ users: await models.users.findAll() });
});

userRouter.get('/:id', (req, res, next) => {
  res.status(200).send({ user: req.user });
});

userRouter.post('/', async (req, res, next) => {
  try {
    const user = await models.users.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      return res.status(400).send({ message: 'This email is already used' });
    }
    const newUser = await models.users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
    });
    res.status(201).send({ newUser });
  } catch (err) {
    res.status(400).send({ message: 'Email is required' });
  }
});

userRouter.put('/:id/password', async (req, res, next) => {
  res.status(200).send({
    userUpdated: await models.users.findOne({ where: { id: req.params.id } }),
  });
});

userRouter.put('/:id/city', async (req, res, next) => {
  res.status(200).send({
    userUpdated: await models.users.findOne({ where: { id: req.params.id } }),
  });
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    await req.user.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
  }
});

module.exports = userRouter;
