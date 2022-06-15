const express = require('express');
const { models } = require('../../sequelize');
const {
  getProduction,
  getProductionDetailled,
  checkIfUserExists,
} = require('../helpers');

const userProductionRouter = express.Router();

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

module.exports = userProductionRouter;