const applyExtraSetup = sequelize => {
  const { users, vegetables, userProduction, trades } = sequelize.models;

  users.hasMany(userProduction, { onDelete: 'cascade' });
  vegetables.hasMany(userProduction, { onDelete: 'cascade' });

  userProduction.belongsTo(users);
  userProduction.belongsTo(vegetables);

  trades.belongsTo(userProduction, { foreignKey: 'id', onDelete: 'cascade' });
};

module.exports = { applyExtraSetup };
