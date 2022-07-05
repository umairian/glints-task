const express = require("express");
const router = express.Router();

const controller = require("../controllers/restaurant");

router.get("/open", controller.open);
router.get("/top", controller.top);
router.get("/search", controller.search);

module.exports = router;
