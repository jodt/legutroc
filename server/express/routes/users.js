const express = require('express');
const { models } = require('../../sequelize');
const {
  getIdParam,
  capitalizeFirstLetter,
  lowerCaseAllKeys,
} = require('../helpers');

const bcrypt = require('bcrypt');

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
  const copyOfBody = lowerCaseAllKeys(req.body);
  try {
    const user = await models.users.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      return res
        .status(400)
        .send({ code: 400, message: 'Cet email existe déjà' });
    }
    await models.users.create({
      firstName: capitalizeFirstLetter(copyOfBody.firstName),
      lastName: copyOfBody.lastName.toUpperCase(),
      email: copyOfBody.email,
      password: bcrypt.hashSync(req.body.password, 10),
      city: capitalizeFirstLetter(copyOfBody.city),
    });
    res
      .status(201)
      .send({ code: 201, message: 'Merci pour votre inscription' });
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
