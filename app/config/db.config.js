require("dotenv").config();

module.exports = {
  HOST: process.env.PGHOST,
  USER: process.env.PGUSER,
  PASSWORD: process.env.PGPASSWORD,
  DB: process.env.PGDATABASE,
  dialect: "postgres",
  ssl: process.env.DB_SSL === "true" ? true : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};