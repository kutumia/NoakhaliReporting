const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.dd = require("./dd.model.js")(sequelize, Sequelize);
db.ad = require("./ad.model.js")(sequelize, Sequelize);
db.upazilla = require("./upazilla.model.js")(sequelize, Sequelize);
db.trainedFarmer = require("./trainedFarmer.model.js")(sequelize, Sequelize);
db.initialTrial = require("./initialTrial.model.js")(sequelize, Sequelize);
db.finalTrial = require("./finalTrial.model.js")(sequelize, Sequelize);
db.agriFair = require("./agriFair.model.js")(sequelize, Sequelize);
db.fieldDay = require("./fieldDay.model.js")(sequelize, Sequelize);
db.irrigation = require("./irrigation.model.js")(sequelize, Sequelize);
db.machinery = require("./machinery.model.js")(sequelize, Sequelize);
db.motivation = require("./motivation.model.js")(sequelize, Sequelize);


module.exports = db;