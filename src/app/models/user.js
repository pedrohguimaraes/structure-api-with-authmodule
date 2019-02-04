const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {

    const User = sequelize.define('User', {
      username: DataType.STRING(),
      password: DataType.STRING(100),
      email: DataType.STRING(150),
      passwordResetToken: DataType.STRING(300),
      passwordResetExpires:{ type: DATE, defautValue: sequelize.NOW} 
    }, {
      timestamps: false,
      tableName: 'user'
    });

    return User;
  }