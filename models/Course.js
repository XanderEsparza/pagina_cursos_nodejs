'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Membership,{as: 'memberships',foreignKey: 'id_curso'});
      
      Course.hasMany(models.Purchase,{as: 'purchases',foreignKey: 'id_curso'});
      
      Course.hasMany(models.Video,{as: 'videos',foreignKey: 'id_curso'});
      
      Course.hasMany(models.Image,{as: 'images',foreignKey: 'id_curso'});
      
      Course.hasMany(models.Objective,{as: 'objectives',foreignKey: 'id_curso'});

      

    }
  }
  Course.init({
    titulo: DataTypes.STRING,
    categoria: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    nivel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};