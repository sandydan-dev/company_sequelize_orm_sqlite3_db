const { sequelize, DataTypes } = require("../lib/index");

const company = sequelize.define("compnay", {
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  foundedYear: DataTypes.INTEGER,
  headquarter: DataTypes.TEXT,
  revenue: DataTypes.INTEGER,
});

module.exports = company;
