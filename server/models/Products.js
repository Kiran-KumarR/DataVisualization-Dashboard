const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    category: {
      type: DataTypes.TEXT,
    },
    ean: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 5000,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    vendor: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false // Disable timestamps
  });

  return Product;
};

module.exports = Product;
