const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
          this.setDataValue('password', hash);
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false,
    },
  );

  return User;
};
