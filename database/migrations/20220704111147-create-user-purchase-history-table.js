'use strict';

const { DataTypes } = require("sequelize");

const table = "user_purchase_histories";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable(table, {
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
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  }
};
