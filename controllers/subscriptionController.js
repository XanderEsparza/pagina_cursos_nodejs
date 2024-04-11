const { Stripe } = require('stripe');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const userModel = require('../models/').User;
const subscriptionModel = require('../models/').Subscription;
const courseModel = require('../models').Course;
const purchaseModel = require('../models').Purchase;
const membershipModel = require('../models').Membership;
const logger = require('../helpers/logger')


const stripe = new Stripe(process.env.STRIPE_SECRET)

const basicSub = async (req, res) => {   
    const id = 1
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    product_data:{
                        name:'Subscripción Básica',
                        description: 'Suscripción recomendada para reclamar cursos de nivel 1'
                    },
                    currency: 'usd',
                    unit_amount: 500,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/subscription/success/'+id,
        cancel_url: 'http://localhost:3000/cancel'
    })
    return res.json(session)
};

const mediumSub = async (req, res) => {   
    const id = 2
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    product_data:{
                        name:'Subscripción Media',
                        description: 'Suscripción recomendada para reclamar cursos de nivel 2'
                    },
                    currency: 'usd',
                    unit_amount: 1000,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/subscription/success/'+id,
        cancel_url: 'http://localhost:3000/cancel'
    })
    return res.json(session)
};

const premiumSub = async (req, res) => {   
    const id = 3
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    product_data:{
                        name:'Subscripción Premium',
                        description: 'Suscripción recomendada para reclamar cursos de nivel 3'
                    },
                    currency: 'usd',
                    unit_amount: 1500,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/subscription/success/'+id,
        cancel_url: 'http://localhost:3000/cancel'
    })
    return res.json(session)
};

const success = async (req, res) => {  
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decodedToken.id;
    const userUsuario = decodedToken.usuario;

    try {
        const user = await userModel.findOne({ where: {id:userId} })

        const puntos_actuales = user.puntos;

        const id_usuario = userId
        const codigo = Date.now();
        const fecha_compra = new Date;
        const fecha_vencimiento = new Date;
        fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1)
        const estatus = 1
        const {id} = req.params;
        const puntos = puntos_actuales + parseInt(id)
        
        const subscription = await subscriptionModel.create({id_usuario:id_usuario, codigo:codigo, fecha_compra:fecha_compra, fecha_vencimiento:fecha_vencimiento, estatus:estatus, nivel:id})


        const userUpdate = await userModel.update({suscripcion_actual:codigo,puntos:puntos},
            {
                where: {
                    id:id_usuario
                }
            })
            logger.info('El usuario '+ userUsuario + ' ha comprado una suscripcion nivel '+id);
            res.redirect('/courses/show')

        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

const purchase = async (req, res) => {
    const {id} = req.params;
    const course = await courseModel.findOne({ where: {id:id}});

    const titulo = course.titulo;
    const descripcion = course.descripcion;
    const precio = (course.precio / 16) *100;
    console.log(precio)
    const id_curso = course.id

    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    product_data:{
                        name:titulo,
                        description: descripcion
                    },
                    currency: 'usd',
                    unit_amount: precio,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/purchase/success/'+id,
        cancel_url: 'http://localhost:3000/cancel'
    })
    return res.json(session)
};

const successPurchase = async (req, res) => {  
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decodedToken.id;
    const userUsuario = decodedToken.usuario;

    try {
        const id_usuario = userId
        const {id} = req.params;
        const fecha_compra = new Date;
        
        const purchase = await purchaseModel.create({id_usuario:id_usuario, id_curso:id, fecha_compra:fecha_compra})

        logger.info('El usuario '+ userUsuario + ' ha comprado el curso con el id '+id);
        res.redirect('/courses/show')
          
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
};

const reclamar = async (req, res) => {  
    const token = req.cookies.token; 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decodedToken.id;
    const userUsuario = decodedToken.usuario;

    try {
        const user = await userModel.findOne({ where: {id:userId} })

        const puntos_actuales = user.puntos;
        const id_usuario = userId
        const {id} = req.params;
        const fecha_reclamacion = new Date;
        const puntos = puntos_actuales - 1;
        
        const membership = await membershipModel.create({id_usuario:id_usuario, id_curso:id, fecha_reclamacion:fecha_reclamacion})
        
        const userUpdate = await userModel.update({puntos:puntos},
            {
                where: {
                    id:id_usuario
                }
            })
            logger.info('El usuario '+ userUsuario + ' ha reclamado el curso con el id '+id);
            res.redirect('/courses/show')
          
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
};

const cancel = async (req, res) => {   
    res.redirect('/courses/show')
};

module.exports = {
    basicSub,
    mediumSub,
    premiumSub,
    success,
    purchase,
    successPurchase,
    reclamar,
    cancel
}