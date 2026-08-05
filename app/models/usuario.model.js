// app/models/usuario.model.js
module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      // Aquí NUNCA se guarda la contraseña en texto plano, solo su hash (ver 12.4)
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return Usuario;
};