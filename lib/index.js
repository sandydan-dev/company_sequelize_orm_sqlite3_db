// require sequelize to create instance of sequelize
const sq = require("sequelize");

// create instance
const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./db/company_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
