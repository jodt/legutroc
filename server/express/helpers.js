const { models } = require('../sequelize');

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
      attributes: ['id', 'vegetableId', 'description'],
      where: { userId: id },
    });
    return JSON.parse(JSON.stringify(production));
  } catch (err) {
    res.send({ message: 'Not a valid id' });
  }
};

const getProductionDetailled = async production => {
  try {
    const productionDetailled = await Promise.all(
      production.map(async production => {
        try {
          production.vegetable = await models.vegetables.findOne({
            where: { id: production.vegetableId },
          });
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

module.exports = {
  getIdParam,
  getProduction,
  getProductionDetailled,
  checkIfUserExists,
};
