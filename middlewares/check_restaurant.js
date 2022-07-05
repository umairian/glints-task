const { isNull } = require("lodash");
const { Restaurants } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurants.findByPk(restaurantId);
    if (isNull(restaurant)) {
      throw { status: 404, message: "Restaurant not found" };
    }
    req.restaurant = restaurant;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong!");
  }
};
