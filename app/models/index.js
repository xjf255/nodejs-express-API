// Cargamos el archivo de configuración con los datos de conexión a la base de datos
const dbConfig = require("../config/db.config.js");

// Importamos Sequelize, el ORM que nos permite trabajar con PostgreSQL como objetos JS
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB/Render
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  // Configuración específica de PostgreSQL, incluyendo conexión segura SSL
  dialectOptions: {
    ssl: {
      require: true,             // La conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false  // Acepta certificados autofirmados (útil en entornos no productivos)
    }
  },

  // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Objeto db que exportaremos para acceder a Sequelize y los modelos desde el resto del proyecto
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Registramos el modelo de cliente en el objeto db
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);

// Aquí puedes seguir registrando otros modelos de forma similar
// Ejemplo: db.productos = require("./producto.model.js")(sequelize, Sequelize);

module.exports = db;