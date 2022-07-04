const express = require("express");
const router = express.Router();

const controller = require("../controllers/restaurant");

router.get("/open", controller.open);

module.exports = router;
