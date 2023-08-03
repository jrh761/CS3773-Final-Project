const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zipcode: {
        type: DataTypes.STRING,
      },
      cardNumber: {
        type: DataTypes.STRING,
      },
      ccvNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true, // This will give you createdAt and updatedAt
      underscored: false,
    },
  );

  Customer.associate = (models) => {
    Customer.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Customer;
};
