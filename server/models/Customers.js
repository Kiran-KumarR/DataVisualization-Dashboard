// customers.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Customer = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.TEXT,
    },
    zip: {
      type: DataTypes.TEXT,
    },
    birth_date: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    source: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false // Disable timestamps
  });

  return Customer;
};



module.exports = Customer;
