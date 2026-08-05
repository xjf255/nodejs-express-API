const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// En server.js, ANTES de app.use(bodyParser.json())
app.post("/api/pago/webhook", express.raw({ type: "application/json" }),
  require("./app/controllers/pago.controller.js").webhook
);

// Después, el resto de rutas normales:
app.use(bodyParser.json());
require("./app/routes/pago.route")(app); // el resto de rutas de pago (crear-sesion) sí usa JSON normal

// Parsear requests de tipo application/json
app.use(bodyParser.json());

// Parsear requests de tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // Si necesitas recrear las tablas desde cero (¡cuidado, borra los datos!):
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

require("./app/routes/cliente.route")(app);
require("./app/routes/auth.route")(app);
// Si agregas más recursos (ej. tutorial), regístralos igual:
// require("./app/routes/tutorial.route")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});