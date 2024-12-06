const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true, 
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return User;
};


module.exports = User;
