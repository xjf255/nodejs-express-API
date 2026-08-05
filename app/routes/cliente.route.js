module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const { verifyToken } = require("../middlewares/authJwt.js");
  var router = require("express").Router();

  // Create a new Client
  router.post("/create", [verifyToken], clientes.create);
  // Retrieve all Clients
  router.get("/", clientes.findAll);
  // Retrieve all active Clients
  router.get("/status", clientes.findAllStatus);
  // Retrieve a single Client by id
  router.get("/:id", clientes.findOne);
  // Update a Client by id
  router.put("/update/:id",[verifyToken] ,clientes.update);
  // Delete a Client by id
  router.delete("/delete/:id", [verifyToken], clientes.delete);
  // Delete all Clients
  router.delete("/delete", [verifyToken], clientes.deleteAll);
  // app.use("/prefijo", router) simplifica el URI final
  // Ej. http://localhost:puerto/api/customer/
  app.use("/api/customer", router);
};