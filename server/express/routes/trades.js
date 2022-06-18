const express = require('express');
const { models } = require('../../sequelize');

const tradeRouter = express.Router();

tradeRouter.get('/', async (req, res, next) => {
  res.status(200).send({ trades: await models.trades.findAll() });
});

tradeRouter.post('/', async (req, res, next) => {
  try {
    await models.trades.create({
      userProductionId_1: req.body.userProductionId_1,
      userProductionId_2: req.body.userProductionId_1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = tradeRouter;
