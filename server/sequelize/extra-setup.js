const applyExtraSetup = sequelize => {
  const { users, vegetables, userProduction } = sequelize.models;

  userProduction.belongsTo(users);
  userProduction.belongsTo(vegetables);
};

module.exports = { applyExtraSetup };
