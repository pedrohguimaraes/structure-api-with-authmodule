const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {

    const User = sequelize.define('User', {
      username: DataType.STRING(),
      password: DataType.STRING(100),
    }, {
      timestamps: false,
      tableName: 'user'
    });

    return User;
  }