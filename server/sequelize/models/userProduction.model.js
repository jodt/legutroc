const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'userProduction',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      vegetableId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'vegetables',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      tableName: 'userProduction',
      freezeTableName: true,
    }
  );
};