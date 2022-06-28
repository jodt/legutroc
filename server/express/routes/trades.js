const express = require('express');
const nodemailer = require('nodemailer');
const { models } = require('../../sequelize');
const { Op } = require('sequelize');
const { getProductionDetailled } = require('../helpers');

const tradeRouter = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.laposte.net',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

console.log(process.env.PASSWORD);

tradeRouter.get('/', async (req, res, next) => {
  res.status(200).send(await models.trades.findAll());
});

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

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

tradeRouter.put('/:tradeId/status', async (req, res, next) => {
  const trade = await models.trades.findOne({
    where: { id: req.params.tradeId },
  });
  const productionOne = await models.userProduction.findOne({
    where: { id: trade.userProductionId_1 },
  });
  const productionTwo = await models.userProduction.findOne({
    where: { id: trade.userProductionId_2 },
  });
  const productionDetailled = await getProductionDetailled([
    productionOne,
    productionTwo,
  ]);
  const mailOptions = {
    from: process.env.EMAIL,
    to: productionDetailled[1].user.email,
    subject: 'Votre échange a été accepté',
    text: `${productionDetailled[0].user.firstName} a accepté votre échange.\n 
Votre produit: ${productionDetailled[0].vegetable.name} 
Son produit: ${productionDetailled[1].vegetable.name}
Contactez le à cette adresse : ${productionDetailled[0].user.email} pour procéder à l'échange.\n
L'équipe Légu'troc
`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
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

tradeRouter.delete('/:tradeId/delete', async (req, res, next) => {
  try {
    const trade = await models.trades.findOne({
      where: { id: req.params.tradeId },
    });
    if (trade) {
      trade.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: 'Invalid trade' });
    }
  } catch (err) {
    console.error(error);
  }
});

tradeRouter.post('/exist', async (req, res, next) => {
  try {
    const trade = await models.trades.findOne({
      where: {
        [Op.or]: [
          {
            userProductionId_1: req.body.production1,
            userProductionId_2: req.body.production2,
          },
          {
            userProductionId_1: req.body.production2,
            userProductionId_2: req.body.production1,
          },
        ],
      },
    });
    trade ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = tradeRouter;
