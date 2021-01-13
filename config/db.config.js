/*module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "noakhali",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/

var dotenv = require('dotenv');
dotenv.config()
const { DBHOST, DBUSER, DBPASSWORD, DB } = process.env
//console.log(DBHOST, DBHOST, DBUSER, DBPASSWORD, DB)
module.exports = {
  HOST: DBHOST,
  PORT: 3306,
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
