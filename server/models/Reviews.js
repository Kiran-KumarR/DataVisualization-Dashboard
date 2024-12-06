// reviews.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Review = (sequelize) => {
  
   
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  reviewer: {
    type: DataTypes.TEXT,
  },
  product_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  body: {
    type: DataTypes.TEXT,
  },
},{
  timestamps: false // Disable timestamps
});
  return Review;
}

module.exports = Review;
