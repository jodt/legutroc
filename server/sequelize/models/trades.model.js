const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'trades',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userProductionId_1: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'userProduction',
          key: 'id',
        },
      },
      userProductionId_2: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'userProduction',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      tableName: 'trades',
      freezeTableName: true,
    }
  );
};
