'use strict';
module.exports = (sequelize, DataTypes) => {
  var bcrypt = require('bcryptjs');

  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }

    },
    timestamps: true,
    paranoid: true

  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};