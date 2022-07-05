"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const RestaurantOpeningHour = sequelize.define("restaurant_opening_hours", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    day_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opening: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    closing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  RestaurantOpeningHour.beforeCreate(async (restaurantOpeningHour) => {
    restaurantOpeningHour.dataValues.createdAt = moment().unix();
    restaurantOpeningHour.dataValues.updatedAt = moment().unix();
  });
  RestaurantOpeningHour.beforeUpdate(async (restaurantOpeningHour) => {
    restaurantOpeningHour.dataValues.updatedAt = moment().unix();
  });

  RestaurantOpeningHour.associate = (models) => {
    RestaurantOpeningHour.belongsTo(models.Restaurants, {
      as: "restaurant",
      foreignKey: "fk_restaurant_id",
      targetKey: "id",
    });
  };

  return RestaurantOpeningHour;
};
