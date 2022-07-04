'use strict';

const moment = require("moment");
const restaurantsData = require("../../data/restaurants");
const { TIME_FORMAT } = require("../../constants");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("restaurants");
    await queryInterface.bulkDelete("restaurant_menus");
    await queryInterface.bulkDelete("restaurant_opening_hours");
    for(let [index, restaurantData] of restaurantsData.entries()) {
      await queryInterface.sequelize.query(`INSERT INTO restaurants (id, name, cash_balance, createdAt, updatedAt) VALUES ("${index + 1}", "${restaurantData.restaurantName}", "${restaurantData.cashBalance}", "${moment().unix()}", "${moment().unix()}")`);

      if(restaurantData.menu.length) {
        for(let menu of restaurantData.menu) {
          await queryInterface.sequelize.query(`INSERT INTO restaurant_menus (dish_name, price, fk_restaurant_id, createdAt, updatedAt) VALUES ("${menu.dishName}", "${menu.price}", "${index+1}", "${moment().unix()}", "${moment().unix()}")`)
        }
      }

      const openingHours = restaurantData.openingHours.split("/");
      for(let openingHour of openingHours) {
        const result = openingHour.split(",");
        const dashResult = openingHour.split("-");
        if(result.length === 1 && dashResult.length === 2) {
          // result[0].replace(/\s/g, "");
          const [day] = result[0].trim().split(" ");
          let [opening, closing] = result[0].replace(day, "").replace(/\s/g, "").split("-");
          opening = moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;
          closing = moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;

          await queryInterface.sequelize.query(`INSERT INTO restaurant_opening_hours (day_name, opening, closing, fk_restaurant_id, createdAt, updatedAt) VALUES ("${day}", "${opening}", "${closing}", "${index + 1}", "${moment().unix()}", "${moment().unix()}")`, { logging: console.log });
          
        } else if (result.length === 2 && dashResult.length === 2) {
          let [dayFirst, daySecond] = result;
          dayFirst = dayFirst.trim();
          [daySecond] = daySecond.trim().split(" ");
          let [opening, closing] = result[1].replace(daySecond, "").replace(/\s/g, "").split("-");
          opening = moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;
          closing = moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;

          await queryInterface.sequelize.query(`INSERT INTO restaurant_opening_hours (day_name, opening, closing, fk_restaurant_id, createdAt, updatedAt) VALUES ("${dayFirst}", "${opening}", "${closing}", "${index + 1}", "${moment().unix()}", "${moment().unix()}")`, { logging: console.log });

          await queryInterface.sequelize.query(`INSERT INTO restaurant_opening_hours (day_name, opening, closing, fk_restaurant_id, createdAt, updatedAt) VALUES ("${daySecond}", "${opening}", "${closing}", "${index + 1}", "${moment().unix()}", "${moment().unix()}")`, { logging: console.log });
        }
        if(dashResult.length === 3) {
          let [firstDay, secondDay] = dashResult;
          firstDay = firstDay.trim();
          secondDay = secondDay.trim();
          [secondDay] = secondDay.trim().split(" ");
          let opening = dashResult[1].replace(secondDay, "").replace(/\s/g, "");
          let closing = dashResult[2].trim().replace(/\s/g, "");
          opening = moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(opening, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;
          closing = moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') ? moment(closing, TIME_FORMAT).diff(moment().startOf('day'), 'seconds') : 86400;

          await queryInterface.sequelize.query(`INSERT INTO restaurant_opening_hours (day_name, opening, closing, fk_restaurant_id, createdAt, updatedAt) VALUES ("${firstDay}", "${opening}", "${closing}", "${index + 1}", "${moment().unix()}", "${moment().unix()}")`, { logging: console.log });

          await queryInterface.sequelize.query(`INSERT INTO restaurant_opening_hours (day_name, opening, closing, fk_restaurant_id, createdAt, updatedAt) VALUES ("${secondDay}", "${opening}", "${closing}", "${index + 1}", "${moment().unix()}", "${moment().unix()}")`, { logging: console.log });
        }
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("restaurants");
    await queryInterface.bulkDelete("restaurant_menus");
    await queryInterface.bulkDelete("restaurant_opening_hours");
  }
};
