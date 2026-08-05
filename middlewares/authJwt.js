// app/middlewares/authJwt.js
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  // El token viaja en el header "x-access-token" o en "Authorization: Bearer <token>"
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7); // quitamos el prefijo "Bearer "
  }

  if (!token) {
    return res.status(403).send({ message: "No se proporcionó ningún token." });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      // Esta rama también captura el caso de un token EXPIRADO (TokenExpiredError)
      return res.status(401).send({ message: "No autorizado: token inválido o expirado." });
    }
    // Guardamos el id del usuario decodificado del token para usarlo en el controlador si hace falta
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken };
module.exports = authJwt;