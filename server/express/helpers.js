const { models } = require('../sequelize');
const { Op } = require('sequelize');

const getIdParam = (req, res, next) => {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
};

const getProduction = async (req, res, next) => {
  try {
    const id = Number(req.params.userId);
    const production = await models.userProduction.findAll({
      where: {
        [Op.and]: [{ userId: id }, { status: { [Op.is]: null } }],
      },
    });
    return copyOfObject(production);
  } catch (err) {
    res.send({ message: 'Not a valid id' });
  }
};

const getProductionDetailled = async production => {
  try {
    const productionDetailled = await Promise.all(
      production.map(async production => {
        try {
          production.user = await models.users.findOne({
            where: { id: production.userId },
          });
          production.vegetable = await models.vegetables.findOne({
            where: { id: production.vegetableId },
          });
          production.user = (({ id, firstName, lastName, city }) => ({
            id,
            firstName,
            lastName,
            city,
          }))(production.user);
          delete production['userId'];
          delete production['vegetableId'];
          return production;
        } catch (err) {
          console.error(err);
        }
      })
    );
    return productionDetailled;
  } catch (err) {
    console.error(err);
  }
};

const checkIfUserExists = async (req, res, next) => {
  const user = await models.users.findOne({ where: { id: req.params.userId } });
  if (!user) {
    res.status(404).send({ message: 'User not found' });
  } else {
    next();
  }
};

const checkIfAlreadyInProduction = async (req, res, next) => {
  try {
    const production = await getProduction(req, res);
    const productionDetailled = await getProductionDetailled(production);
    const vegetableId = req.body.vegetableId;

    const alreadyInProduction = productionDetailled.some(
      prod => prod.vegetable.id === Number(vegetableId)
    );
    if (!alreadyInProduction) {
      next();
    } else {
      res.status(400).send({
        message: `You already have this vegetable in your production`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const lowerCaseAllKeys = obj =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.toLowerCase()]));

const copyOfObject = obj => JSON.parse(JSON.stringify(obj));

module.exports = {
  getIdParam,
  getProduction,
  getProductionDetailled,
  checkIfUserExists,
  checkIfAlreadyInProduction,
  copyOfObject,
  capitalizeFirstLetter,
  lowerCaseAllKeys,
};
