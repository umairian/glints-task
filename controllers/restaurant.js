const {
  RestaurantOpeningHours,
  Restaurants,
  RestaurantMenus,
  sequelize,
} = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
const { isNil, isUndefined } = require("lodash");

module.exports = {
  open: async (req, res) => {
    try {
      const day = moment().format("ddd");
      const time = moment(moment(), "HH:mm a").diff(
        moment().startOf("day"),
        "seconds"
      );
      const restaurantOpeningHours = await RestaurantOpeningHours.findAll({
        where: {
          day_name: {
            [Op.like]: `%${day}%`,
          },
          opening: {
            [Op.lt]: time,
          },
          closing: {
            [Op.gt]: time,
          },
        },
        include: {
          model: Restaurants,
          as: "restaurant",
          attributes: ["id", "name"],
        },
      });

      let restaurants = [];
      for (let el of restaurantOpeningHours) {
        restaurants = [...restaurants, el.restaurant];
      }

      return res.status(200).send({ openRestaurants: restaurants });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  top: async (req, res) => {
    try {
      let { count, maxNumOfDishes, priceFrom, priceTo } = req.query;
      if (!count || !maxNumOfDishes || isNil(priceFrom) || isNil(priceTo)) {
        throw { status: 400, message: "Required fields can't be empty" };
      }
      count = Number(count);
      maxNumOfDishes = Number(maxNumOfDishes);
      priceFrom = Number(priceFrom);
      priceTo = Number(priceTo);

      const restaurants = await Restaurants.findAll({
        order: [["name", "ASC"]],
        limit: Number(count),
        include: {
          model: RestaurantMenus,
          as: "menus",
          where: {
            price: {
              [Op.between]: [priceFrom, priceTo],
            },
          },
        },
      });
      res.status(200).send({ restaurants });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  search: async (req, res) => {
    try {
      let { searchTerm } = req.query;
      if (!searchTerm) {
        throw { status: 400, message: "Search query must not be empty" };
      }

      searchTerm = searchTerm.trim(); // removes all the whitespaces in the string
      if (searchTerm.length < 3) {
        throw {
          status: 400,
          message: "Search query must be longer than 2 characters",
        };
      }
      let searchTerms = searchTerm.split(" ");

      let whereClause = [];
      let restaurants = [];
      let dishes = [];
      for (let term of searchTerms) {
        whereClause = [{ [Op.like]: `%${term}%` }];
      }
      if (!isUndefined(whereClause)) {
        restaurants = await Restaurants.findAll({
          where: {
            name: { [Op.or]: whereClause },
          },
          attributes: ["id", "name"],
        });
        dishes = await RestaurantMenus.findAll({
          where: {
            dish_name: { [Op.or]: whereClause },
          },
          attributes: ["id", "dish_name", "price"],
        });
      }

      return res.status(200).send({ restaurants, dishes });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
