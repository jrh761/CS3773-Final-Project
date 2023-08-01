const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'productId',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false,
    },
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        field: 'productId',
      },
      as: 'product',
    });
  };

  return CartItem;
};
