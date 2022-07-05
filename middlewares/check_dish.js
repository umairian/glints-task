const { isNull } = require("lodash");
const { RestaurantMenus } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const {
      restaurant,
      params: { dishId },
    } = req;
    const dish = await RestaurantMenus.findOne({
      where: { id: dishId, fk_restaurant_id: restaurant.id },
    });
    if (isNull(dish)) {
      throw { status: 404, message: "Dish not found" };
    }
    req.dish = dish;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong!");
  }
};
