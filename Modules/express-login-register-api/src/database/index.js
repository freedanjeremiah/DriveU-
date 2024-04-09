const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "driveU",
  "root",  
  "Freedan@123", 
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
