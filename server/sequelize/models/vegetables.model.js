const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'vegetables',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'vegetables',
      freezeTableName: true,
    }
  );
};
