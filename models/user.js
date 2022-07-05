"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
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

    User.beforeCreate(async (user) => {
        user.dataValues.createdAt = moment().unix();
        user.dataValues.updatedAt = moment().unix();
    });
    User.beforeUpdate(async (user) => {
        user.dataValues.updatedAt = moment().unix();
    });

    User.associate = (models) => {
        User.hasMany(models.UserPurchaseHistories, {
            as: "purchaseHistory",
            foreignKey: "fk_user_id",
            targetKey: "id",
        });
    };

    return User;
};
