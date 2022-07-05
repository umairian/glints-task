const { UserPurchaseHistories, sequelize } = require("../models");
const moment = require("moment");

module.exports = {
  purchase: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { user, dish } = req;
      const userTransaction = await UserPurchaseHistories.create(
        {
          fk_restaurant_menu_id: dish.id,
          fk_user_id: user.id,
          transaction_amount: dish.price,
          transaction_date: moment().unix(),
        },
        { transaction }
      );

      await transaction.commit();
      return res.status(200).send({ userTransaction });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
