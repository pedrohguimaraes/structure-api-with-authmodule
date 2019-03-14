const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {

    const Usuario = sequelize.define('Usuario', {
      username: DataType.STRING(),
      password: DataType.STRING(100),
      email: DataType.STRING(150),
      passwordResetToken: DataType.STRING(300),
      passwordResetExpires: DataType.DATE
    }, {
      timestamps: false,
      tableName: 'usuario'
    });

    return Usuario;
}