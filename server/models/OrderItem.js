const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Order',
          key: 'orderId',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'productId',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false,
    },
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  };

  return OrderItem;
};
