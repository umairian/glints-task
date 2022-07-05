const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

// Middlewares
const checkUser = require("../middlewares/check_user");
const checkRestaurant = require("../middlewares/check_restaurant");
const checkDish = require("../middlewares/check_dish");


router.post("/:userId/restaurants/:restaurantId/dishes/:dishId", checkUser, checkRestaurant, checkDish, controller.purchase);

module.exports = router;
