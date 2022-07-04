'use strict';

const { DataTypes } = require("sequelize");

const table = "restaurant_opening_hours";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable(table, {
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      closing: {
        type: DataTypes.STRING,
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
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  }
};
