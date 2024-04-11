'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Subscription,{as: 'subscriptions',foreignKey: 'id_usuario'});

      User.hasMany(models.Purchase,{as: 'purchases',foreignKey: 'id_usuario'});

      User.hasMany(models.Membership,{as: 'memberships',foreignKey: 'id_usuario'});

    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    id_rol: DataTypes.INTEGER,
    suscripcion_actual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

