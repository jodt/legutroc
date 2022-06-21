const express = require('express');
const { models } = require('../../sequelize');

const {
  getProduction,
  getProductionDetailled,
  checkIfUserExists,
  checkIfAlreadyInProduction,
  copyOfObject,
} = require('../helpers');

const userProductionRouter = express.Router();

userProductionRouter.get('/search', async (req, res, next) => {
  if (req.query.city) {
    var city = req.query.city.charAt(0).toUpperCase() + req.query.city.slice(1);
  }
  if (req.query.vegetable) {
    var vegetable =
      req.query.vegetable.charAt(0).toUpperCase() +
      req.query.vegetable.slice(1);
  }

  try {
    const production = await models.userProduction.findAll();
    const productionDetailled = await getProductionDetailled(
      copyOfObject(production)
    );
    if (!city && !vegetable)
      res.status(200).send({ production: productionDetailled });
    else {
      const productionFiltered = productionDetailled.filter(production => {
        if (!city && vegetable) {
          return production.vegetable.name === vegetable;
        } else if (!vegetable && city) {
          return production.user.city === city;
        }
        return (
          production.user.city === city &&
          production.vegetable.name === vegetable
        );
      });
      res.status(200).send({ production: productionFiltered });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

userProductionRouter.get(
  '/:userId',
  checkIfUserExists,
  async (req, res, next) => {
    try {
      const production = await getProduction(req, res);
      const productionDetailled = await getProductionDetailled(production);
      res.status(200).send({ production: productionDetailled });
    } catch (err) {
      console.error(err);
    }
  }
);

userProductionRouter.post(
  '/:userId',
  checkIfUserExists,
  checkIfAlreadyInProduction,
  async (req, res, next) => {
    const production = await models.userProduction.create({
      userId: req.params.userId,
      vegetableId: req.body.vegetableId,
      description: req.body.description || '',
    });
    res.status(201).send(production);
  }
);

userProductionRouter.delete(
  '/:userId/:productionId',
  checkIfUserExists,
  async (req, res, next) => {
    try {
      const exist = await models.userProduction.findOne({
        where: { userId: req.params.userId, id: req.params.productionId },
      });
      if (exist) {
        exist.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Production not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'An error occured' });
    }
  }
);

userProductionRouter.put('/:productionId/status', async (req, res, next) => {
  try {
    const production = await models.userProduction.findOne({
      where: { id: req.params.productionId },
    });
    production.status = 'Accepted';
    production.save();
    res.status(200).send('production updated');
  } catch (err) {
    console.error(err);
  }
});

module.exports = userProductionRouter;
