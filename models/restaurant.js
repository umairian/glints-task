"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define("restaurants", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cash_balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Restaurant.beforeCreate(async (restaurant) => {
    restaurant.dataValues.createdAt = moment().unix();
    restaurant.dataValues.updatedAt = moment().unix();
  });
  Restaurant.beforeUpdate(async (restaurant) => {
    restaurant.dataValues.updatedAt = moment().unix();
  });

  Restaurant.associate = (models) => {
    Restaurant.hasMany(models.RestaurantMenus, {
      as: "menus",
      foreignKey: "fk_restaurant_id",
      targetKey: "id",
    });
    Restaurant.hasMany(models.RestaurantOpeningHours, {
      as: "openingHours",
      foreignKey: "fk_restaurant_id",
      targetKey: "id",
    });
  };

  return Restaurant;
};
