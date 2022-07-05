const { isNull } = require("lodash");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findByPk(userId);
    if (isNull(user)) {
      throw { status: 404, message: "User not found" };
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong!");
  }
};
