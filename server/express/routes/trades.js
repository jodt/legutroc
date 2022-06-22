const express = require('express');
const { models } = require('../../sequelize');
const { Op } = require('sequelize');
const { getProductionDetailled } = require('../helpers');

const tradeRouter = express.Router();

tradeRouter.get('/:userProductionId', async (req, res, next) => {
  try {
    const trades = await models.trades.findAll({
      where: {
        [Op.or]: [
          { userProductionId_1: req.params.userProductionId },
          { userProductionId_2: req.params.userProductionId },
        ],
      },
    });
    const tradesDetailled = await Promise.all(
      trades.map(async trade => {
        try {
          trade.dataValues['traderOneProductionInfo'] =
            await models.userProduction.findOne({
              where: { id: trade.userProductionId_1 },
            });
          trade.dataValues['traderTwoProductionInfo'] =
            await models.userProduction.findOne({
              where: { id: trade.userProductionId_2 },
            });

          const infos = await getProductionDetailled([
            trade.dataValues['traderOneProductionInfo'],
            trade.dataValues['traderTwoProductionInfo'],
          ]);

          trade.dataValues['traderOneProductionInfo'].dataValues['user'] =
            infos[0].user;
          trade.dataValues['traderOneProductionInfo'].dataValues['vegetable'] =
            infos[0].vegetable;
          trade.dataValues['traderTwoProductionInfo'].dataValues['user'] =
            infos[1].user;
          trade.dataValues['traderTwoProductionInfo'].dataValues['vegetable'] =
            infos[1].vegetable;

          ['userProductionId_1', 'userProductionId_2'].forEach(
            e => delete trade.dataValues[e]
          );
          ['userId', 'vegetableId'].forEach(
            e => delete trade.dataValues.traderOneProductionInfo.dataValues[e]
          );
          ['userId', 'vegetableId'].forEach(
            e => delete trade.dataValues.traderTwoProductionInfo.dataValues[e]
          );
          return trade;
        } catch (err) {
          console.error(err);
        }
      })
    );
    res.status(200).send({ trades: tradesDetailled });
  } catch (err) {
    console.error(err);
  }
});

tradeRouter.post('/', async (req, res, next) => {
  try {
    await models.trades.create({
      userProductionId_1: req.body.userProductionId_1,
      userProductionId_2: req.body.userProductionId_2,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

tradeRouter.put('/:tradeId/status', async (req, res, next) => {
  try {
    const trade = await models.trades.findOne({
      where: { id: req.params.tradeId },
    });
    trade.status = 'Accepted';
    trade.save();
    res.status(200).send('trade updated');
  } catch (err) {
    console.error(err);
  }
});

module.exports = tradeRouter;
