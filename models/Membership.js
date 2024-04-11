'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Membership.init({
    id_usuario: DataTypes.INTEGER,
    id_curso: DataTypes.INTEGER,
    fecha_reclamacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};