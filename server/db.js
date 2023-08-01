const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myshop', 'postgres', 'example', {
  host: 'db',
  dialect: 'postgres',
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
