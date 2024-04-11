const userModel = require('../models/').User;
const courseModel = require('../models/').Course;
const suscripcionModel = require('../models/').Subscription;
const purchaseModel = require('../models/').Purchase;
const imageModel = require('../models/').Image;
const videoModel = require('../models/').Video;
const membershipModel = require('../models/').Membership;
const objectiveModel = require('../models/').Objective;
const sequelize = require('../config/config.json');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const logger = require('../helpers/logger')



const show = async(req,res)=>{
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    try {
        const [users] = await userModel.sequelize.query('SELECT * FROM users');
        res.render('users/show', {users:users});
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
}

const create = (req,res)=>{
    const formData = []
    const errors = []
    res.render('users/create',{formData:formData,errors:errors});
}

const store = async(req, res) => { 
    try {
        const {nombre, apellidos, edad, email, usuario, password} = req.body;
        const puntos = 0;
        const suscripcion_actual = 0;
        const rol = 2;
        const passwordHash = await encrypt(password);
        const codigo = 0;
        const fecha_compra = new Date;
        const fecha_vencimiento = new Date;
        const estatus = 0;
        const nivel = 0;

        const user = await userModel.create({nombre:nombre, apellidos:apellidos, edad:edad, email:email, usuario:usuario, password:passwordHash,puntos:puntos,suscripcion_actual:suscripcion_actual,id_rol:rol})

        const subscription = await suscripcionModel.create({id_usuario:user.id, codigo:codigo, fecha_compra:fecha_compra, fecha_vencimiento:fecha_vencimiento, estatus:estatus, nivel:nivel})

        logger.info('El usuario '+ usuario + ' se ha registrado');
        res.redirect('/login')
        
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
        
        const formData = []
        const errors = []
        const {id} = req.params;
        const user = await userModel.findOne({ where: {id:id} })
        res.render('users/edit', {user:user,formData:formData,errors:errors})
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

const update = async(req,res)=>{
    try {
        const {id} = req.params;
        const {nombre, apellidos, edad, email, usuario} = req.body;

        const user = await userModel.update({nombre:nombre, apellidos:apellidos, edad:edad, email:email, usuario:usuario},
            {
                where: {
                    id:id
                }
            })
        logger.info('El usuario '+ usuario + ' ha modificado sus datos');
        res.redirect('/courses/show')
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

const destroy = async(req,res)=>{
    try {
        const {id} = req.params;

        const user = await userModel.destroy(
            {
                where: {
                    id:id
                }
            })
        res.redirect('/users/show')
        logger.info('El administrador a eliminado al usuario con el id '+id);
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

const compras = async(req,res)=>{
    try {
        const token = req.cookies.token; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        res.locals.userId = decodedToken.id;
        res.locals.userRol = decodedToken.id_rol;
        res.locals.userUsuario = decodedToken.usuario;
        
        const id_usuario = decodedToken.id;
        const courses = await courseModel.findAll({
        
          include: [{ model: imageModel, as: 'images' }]
        });

        const purchases = await purchaseModel.findAll({
            where: {
                id_usuario: id_usuario
          }})
        const memberships = await membershipModel.findAll({
            where: {
                id_usuario: id_usuario
        }})
        res.render('courses/misCursos', {courses:courses,purchases:purchases,memberships:memberships});
        
      } catch (err) {
        res.status(500).json({message:err.message});
      }


}

const suscripciones = async(req,res)=>{
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    res.locals.userId = decodedToken.id;
    res.locals.userRol = decodedToken.id_rol;
    res.locals.userUsuario = decodedToken.usuario;

    try {
        const id = decodedToken.id;
        const suscripciones = await suscripcionModel.findAll({
            where:{
                id_usuario:id
            }
        });
        console.log(suscripciones);
        res.render('courses/suscripcion', {suscripciones:suscripciones});
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

module.exports = {
    show,
    create,
    store,
    edit,
    update,
    destroy,
    compras,
    suscripciones
}