// app/controllers/auth.controller.js
const db = require("../models");
const config = require("../config/auth.config.js");
const Usuario = db.usuarios;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de un nuevo usuario
exports.signup = (req, res) => {
  // Ciframos la contraseña ANTES de guardarla; nunca se guarda en texto plano
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Usuario.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
    .then(usuario => {
      res.send({ message: "Usuario registrado exitosamente!", id: usuario.id });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al registrar el usuario." });
    });
};

// Inicio de sesión: valida que el usuario exista en la BD y que la contraseña coincida
exports.signin = (req, res) => {
  Usuario.findOne({
    where: { username: req.body.username }
  })
    .then(usuario => {
      // 1. ¿Existe el usuario en la base de datos?
      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      // 2. ¿La contraseña coincide con el hash guardado?
      const passwordEsValida = bcrypt.compareSync(req.body.password, usuario.password);
      if (!passwordEsValida) {
        return res.status(401).send({ message: "Contraseña incorrecta." });
      }

      // 3. Si ambas validaciones pasan, generamos un token con TIEMPO DE VIDA definido
      const token = jwt.sign({ id: usuario.id }, config.secret, {
        expiresIn: config.expiresIn // ej. "1h" — el token deja de ser válido después de este tiempo
      });

      res.status(200).send({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        accessToken: token,
        expiresIn: config.expiresIn
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al iniciar sesión." });
    });
};