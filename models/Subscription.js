'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Subscription.init({
    id_usuario: DataTypes.INTEGER,
    codigo: DataTypes.INTEGER,
    fecha_compra: DataTypes.DATE,
    fecha_vencimiento: DataTypes.DATE,
    estatus: DataTypes.INTEGER,
    nivel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};