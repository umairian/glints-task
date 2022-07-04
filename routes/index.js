const express = require("express");
const router = express.Router();

const restaurantRouter = require("./restaurant");

router.use("/restaurants", restaurantRouter);

module.exports = router;
