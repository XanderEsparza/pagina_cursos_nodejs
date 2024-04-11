const courseModel = require('../models/').Course;
const imageModel = require('../models/').Image;
const videoModel = require('../models/').Video;
const objectiveModel = require('../models/').Objective;
const logModel = require('../models/').Log;
const sequelize = require('../config/config.json');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const logger = require('../helpers/logger')




const show = async(req,res)=>{
  
  try {
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    const courses = await courseModel.findAll({
      include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }]
    });
    res.render('admin/courses', {courses:courses});
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
  
  
}

const logs = async(req,res)=>{
  const token = req.cookies.token; 
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
  res.locals.userId = decodedToken.id;
  res.locals.userRol = decodedToken.id_rol;
  res.locals.userUsuario = decodedToken.usuario;

  try {
      const [logs] = await logModel.sequelize.query('SELECT * FROM logs');
      res.render('admin/logs', {logs:logs});
      
  } catch (err) {
      res.status(500).json({message:err.message});
  }
  
}

module.exports = {
    show,
    logs
} 