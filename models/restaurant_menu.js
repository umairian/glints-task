"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const RestaurantMenu = sequelize.define("restaurant_menus", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        dish_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
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

    RestaurantMenu.beforeCreate(async (restaurantMenu) => {
        restaurantMenu.dataValues.createdAt = moment().unix();
        restaurantMenu.dataValues.updatedAt = moment().unix();
    });
    RestaurantMenu.beforeUpdate(async (restaurantMenu) => {
        restaurantMenu.dataValues.updatedAt = moment().unix();
    });

    RestaurantMenu.associate = (models) => {
        RestaurantMenu.belongsTo(models.Restaurants, {
            as: "restaurant",
            foreignKey: "fk_restaurant_id",
            targetKey: "id",
        });
    };

    return RestaurantMenu;
};
