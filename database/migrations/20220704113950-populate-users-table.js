"use strict";

const usersData = require("../../data/user");
const moment = require("moment");
const table = "users";

module.exports = {
  up: (queryInterface) => {
    const usersDataModified = usersData.map((user) => ({
      name: user.name,
      cash_balance: user.cashBalance,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    }));
    return queryInterface.bulkInsert(table, usersDataModified);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(table);
  },
};
