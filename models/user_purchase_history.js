"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const UserPurchaseHistory = sequelize.define("user_purchase_histories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          fk_restaurant_menu_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          fk_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          transaction_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
          },
          transaction_date: {
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

    UserPurchaseHistory.beforeCreate(async (user) => {
        user.dataValues.createdAt = moment().unix();
        user.dataValues.updatedAt = moment().unix();
    });
    UserPurchaseHistory.beforeUpdate(async (user) => {
        user.dataValues.updatedAt = moment().unix();
    });

    UserPurchaseHistory.associate = (models) => {
        UserPurchaseHistory.belongsTo(models.Users, {
            as: "user",
            foreignKey: "fk_user_id",
            targetKey: "id",
        });
    };

    return UserPurchaseHistory;
};
