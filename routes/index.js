const express = require("express");
const router = express.Router();

const restaurantRouter = require("./restaurant");
const userRouter = require("./user");

router.use("/restaurants", restaurantRouter);
router.use("/users", userRouter);

module.exports = router;
