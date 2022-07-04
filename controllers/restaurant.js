const { RestaurantOpeningHours, Restaurants } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = {
    open: async (req, res) => {
        try {
            const day = moment().format("ddd");
            const time = moment(moment(), 'HH:mm a').diff(moment().startOf('day'), 'seconds')
            const restaurantOpeningHours = await RestaurantOpeningHours.findAll({
                where: {
                    day_name: {
                        [Op.like]: `%${day}%`
                    },
                    opening: {
                        [Op.lt]: time,
                    },
                    closing: {
                        [Op.gt]: time 
                    }
                },
                include: { 
                    model: Restaurants, 
                    as: "restaurant",
                    attributes: ["id", "name"]
                }
            });

            let restaurants = [];
            for(let el of restaurantOpeningHours) {
                restaurants = [...restaurants, el.restaurant];
            }

            return res.status(200).send({ openRestaurants: restaurants });
        } catch (err) {
            console.log(err);
            return res.status(err.status || 500).send(err.message || "Something went wrong!");
        }
    }
}