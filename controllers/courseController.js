const userModel = require('../models/').User;
const courseModel = require('../models/').Course;
const suscripcionModel = require('../models/').Subscription;
const purchaseModel = require('../models/').Purchase;
const imageModel = require('../models/').Image;
const videoModel = require('../models/').Video;
const membershipModel = require('../models/').Membership;
const objectiveModel = require('../models/').Objective;
const sequelize = require('../config/config.json');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const logger = require('../helpers/logger');
const { where } = require('sequelize');
const { error } = require('winston');





const show = async(req,res)=>{
  
  try {
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    const id_usuario = decodedToken.id;

    const courses = await courseModel.findAll({
      include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }]
    });
    const nuevosCursos = await courseModel.findAll({
      include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }],
      limit: 4,
      order: [['createdAt', 'DESC']]
    });

    const user = await userModel.findOne({where:id_usuario})
    

    const subscription = await suscripcionModel.findOne({
      where:{
        codigo:user.suscripcion_actual
      }
    })
    res.render('courses/show', {courses:courses,nuevosCursos:nuevosCursos,user:user,subscription:subscription});
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
  
  
}

const showCourse = async(req,res)=>{
  
  try {
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    const id_usuario = decodedToken.id;

    const {id} = req.params;
    const course = await courseModel.findOne({ where: {id:id},
      include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }]
      });

      const user = await userModel.findOne({where:id_usuario})
      
      const purchases = await purchaseModel.findAll({
        where: {
            id_usuario: id_usuario
      }})

    const memberships = await membershipModel.findAll({
        where: {
            id_usuario: id_usuario
    }})

    const subscription = await suscripcionModel.findOne({
      where:{
        codigo:user.suscripcion_actual
      }
    })
    
    res.render('courses/showCourse', {course:course,user:user,purchases:purchases,memberships:memberships,subscription:subscription});
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
  
  
}

const showVideo = async(req,res)=>{
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;
  
  try {
    const {id} = req.params;
    const course = await courseModel.findOne({ where: {id:id},
      include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }]
      });
    res.render('courses/showVideo', {course:course});
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
  
  
}

const create = (req,res)=>{
    
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    const formData = []
    const errors = []
  res.render('courses/create', {formData:formData,errors:errors});
}

const store = async (req, res) => {
  const { titulo, categoria, descripcion, precio, nivel} = req.body;
  const videos = req.files['videos'];
  const imagenes = req.files['imagenes'];
  const objetivos = req.body.objetivos;
  
  try {
    const curso = await courseModel.create({ titulo:titulo, categoria:categoria, descripcion:descripcion, precio:precio, nivel:nivel});
    
    
    if (imagenes && imagenes.length > 0) {
      const imagenesCreadas = await imageModel.bulkCreate(imagenes.map(imagen => ({ url: imagen.filename, id_curso: curso.id })));
    }
    
    if (videos && videos.length > 0) {
      const videosCreados = await videoModel.bulkCreate(videos.map(video => ({ url: video.filename, id_curso: curso.id })));
    }
    
    if (objetivos && objetivos.length > 0) {
      const objetivosCreados = await objectiveModel.bulkCreate(objetivos.map(objetivo => ({ objetivo: objetivo, id_curso: curso.id })));
    }
    
    logger.info('El administrador añadió el curso: '+titulo);
    res.redirect('/admin/courses')
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};

const edit = async(req,res)=>{
  try {
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    const {id} = req.params;
    const course = await courseModel.findOne({ where: {id:id},
      
        include: [{ model: imageModel, as: 'images' },{ model: videoModel, as: 'videos' },{ model: objectiveModel, as: 'objectives' }]
      }); 
      
    res.render('courses/edit', {course:course})
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, descripcion, precio, nivel } = req.body;
  const videos = req.files['videos'];
  const imagenes = req.files['imagenes'];
  const objetivos = req.body.objetivos;

  try {
    await courseModel.update(
      { titulo, categoria, descripcion, precio, nivel },
      { where: { id: id } }
    );

    if (imagenes && imagenes.length > 0) {
      const nuevaImagen = imagenes[0];
      let curso = await courseModel.findByPk(id, { include: [{ model: imageModel, as: 'images' }] });
      if (curso) {
        if (curso.images.length > 0) {
          curso.images[0].url = nuevaImagen.filename;
          await curso.images[0].save();
        } else {
          await imageModel.create({ url: nuevaImagen.filename, id_curso: id });
        }
      }
    }

    if (videos && videos.length > 0) {
      const videosCreados = await videoModel.bulkCreate(videos.map(video => ({ url: video.filename, id_curso: id })));
    }
    
    
    if (objetivos && objetivos.length > 0) {
      const objetivosCreados = await objectiveModel.bulkCreate(objetivos.map(objetivo => ({ objetivo, id_curso: id })));
    }

    logger.info('El administrador actualizó el curso: '+titulo);
    res.redirect('/admin/courses'); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await courseModel.destroy(
      {
          where: {
              id:id
          }
      })

    await imageModel.destroy({ where: { id_curso: id } });
    await videoModel.destroy({ where: { id_curso: id } });
    await objectiveModel.destroy({ where: { id_curso: id } });

    logger.info('El administrador ha eliminado el curso con el id '+id);
    res.redirect('/admin/courses')
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};

module.exports = {
  show,
  showCourse,
  showVideo,
  create,
  store,
  edit,
  update,
  destroy
}

