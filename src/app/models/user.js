const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {

    const User = sequelize.define('User', {
      username: DataType.STRING(),
      password: DataType.STRING(100),
      email: DataType.STRING(150),
      passwordResetToken: DataType.DATE,
      passwordResetExpires: DataType.DATE
    }, {
      timestamps: false,
      tableName: 'user'
    });

    return User;
  }