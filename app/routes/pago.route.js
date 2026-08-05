// app/routes/pago.route.js
module.exports = app => {
  const pagos = require("../controllers/pago.controller.js");
  var router = require("express").Router();

  router.post("/crear-sesion", pagos.crearSesion);

  app.use("/api/pago", router);
};