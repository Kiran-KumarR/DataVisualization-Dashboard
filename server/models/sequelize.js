const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize('kirandb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = { sequelizeInstance };
