const express = require('express');
const { models } = require('../../sequelize');

const { getIdParam } = require('../helpers');

const vegetableRouter = express.Router();

vegetableRouter.use('/:id', async (req, res, next) => {
  try {
    const id = getIdParam(req, res);
    const vegetable = await models.vegetables.findByPk(id);
    if (vegetable) {
      req.vegetable = vegetable;
      next();
    } else {
      res.status(404).send({ message: 'Vegetable not found' });
    }
  } catch (err) {
    res.status(400).send({ message: `Invalid id param` });
  }
});

vegetableRouter.get('/', async (req, res, next) => {
  res.status(200).send({ vegetables: await models.vegetables.findAll() });
});

vegetableRouter.get('/:id', (req, res, next) => {
  res.status(200).send({ vegetable: req.vegetable });
});

vegetableRouter.post('/', async (req, res, next) => {
  try {
    const vegetable = await models.vegetables.findOne({
      where: { name: req.body.name },
    });
    if (vegetable) {
      return res.status(400).send({ message: 'This vegetable already exists' });
    }
    const newVegetable = await models.vegetables.create({
      name: req.body.name,
      image: req.body.image,
    });
    res.status(201).send({ newVegetable });
  } catch (err) {
    console.error(err);
  }
});

vegetableRouter.delete('/:id', async (req, res, next) => {
  try {
    await req.vegetable.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
  }
});

module.exports = vegetableRouter;
