// orders.js
const { DataTypes } = require('sequelize');



const Order = (sequelize) => {
  
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Customers',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    subtotal: {
      type: DataTypes.FLOAT,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
    total: {
      type: DataTypes.FLOAT,
    },
  },{
    timestamps: false // Disable timestamps
  });


  return Order;
};



module.exports = Order;
