const { DataTypes } = require('sequelize');

exports.ContractModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  customer: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
};
