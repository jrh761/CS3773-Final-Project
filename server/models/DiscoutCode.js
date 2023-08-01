const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DiscountCode = sequelize.define(
    'DiscountCode',
    {
      dollarAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        unique: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false,
    },
  );

  return DiscountCode;
};
