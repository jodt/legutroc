const applyExtraSetup = sequelize => {
  const { users, vegetables, userProduction, trades } = sequelize.models;

  users.hasMany(userProduction, { onDelete: 'cascade' });
  vegetables.hasMany(userProduction, { onDelete: 'cascade' });

  userProduction.hasMany(trades, {
    foreignKey: 'userProductionId_1',
    onDelete: 'cascade',
  });

  userProduction.hasMany(trades, {
    foreignKey: 'userProductionId_2',
    onDelete: 'cascade',
  });
};

module.exports = { applyExtraSetup };
