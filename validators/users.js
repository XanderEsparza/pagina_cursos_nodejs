const { check } = require('express-validator');
const { validateResultCreateUser, validateResultEditUser } = require('../helpers/validateHelper');

const validateCreateUser = [
    check('nombre')
    .exists().withMessage('El campo nombre es requerido')
    .not()
    .isEmpty().withMessage('El campo nombre no debe estar vacio')
    .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('No debe tener caracteres especiales ni numeros)')
    .isLength({max: 50}).withMessage('No se deb sobrepasar los 50 caracteres'),

    check('apellidos')
    .exists().withMessage('El campo apellidos es requerido')
    .not()
    .isEmpty().withMessage('El campo apellidos no debe estar vacio')
    .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('(No debe tener caracteres especiales ni numeros)')
    .isLength({max: 50}).withMessage('No se deb sobrepasar los 50 caracteres'),

    check('usuario')
    .exists().withMessage('El campo usuario es requerido')
    .not()
    .isEmpty().withMessage('El campo usuario no debe estar vacio')
    .isAlpha().withMessage('El campo usuario solo deber contener letras')
    .withMessage('Ingresa un usuario válido')
    .isLength({max:16}).withMessage('El usuario no debe sobrepasar los 16 caracteres'),
    

    check('email')
    .exists().withMessage('El campo email es requerido')
    .not()
    .isEmpty().withMessage('El campo email no debe estar vacio')
    .isEmail().withMessage('Ingresa un correo electrónico válido'),

    check('password')
    .exists().withMessage('El campo contraseña es requerido')
    .not()
    .isEmpty().withMessage('El campo contraseña no debe estar vacio')
    .isLength({min:8,max:16}).withMessage('La contraseña no debe sobrepasar los 16 caracteres'),

    check('edad')
    .exists().withMessage('El campo edad es requerido')
    .not()
    .isEmpty().withMessage('El campo Edad no debe estar vacio')
    .isInt({min:1, max:120}).withMessage('La edad debe ser un numero entero menor a 121'),

    (req, res, next) => {
        validateResultCreateUser(req, res, next)
    }
]

const validateEditUser = [
    check('nombre')
    .exists().withMessage('El campo nombre es requerido')
    .not()
    .isEmpty().withMessage('El campo nombre no debe estar vacio')
    .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('No debe tener caracteres especiales ni numeros)')
    .isLength({max: 50}).withMessage('No se deb sobrepasar los 50 caracteres'),

    check('apellidos')
    .exists().withMessage('El campo apellidos es requerido')
    .not()
    .isEmpty().withMessage('El campo apellidos no debe estar vacio')
    .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('(No debe tener caracteres especiales ni numeros)')
    .isLength({max: 50}).withMessage('No se deb sobrepasar los 50 caracteres'),

    check('usuario')
    .exists().withMessage('El campo usuario es requerido')
    .not()
    .isEmpty().withMessage('El campo usuario no debe estar vacio')
    .isAlpha().withMessage('El campo usuario solo deber contener letras')
    .withMessage('Ingresa un usuario válido')
    .isLength({max:16}).withMessage('El usuario no debe sobrepasar los 16 caracteres'),

    check('email')
    .exists().withMessage('El campo email es requerido')
    .not()
    .isEmpty().withMessage('El campo email no debe estar vacio')
    .isEmail().withMessage('Ingresa un correo electrónico válido'),

    check('edad')
    .exists().withMessage('El campo edad es requerido')
    .not()
    .isEmpty().withMessage('El campo Edad no debe estar vacio')
    .isInt({min:1, max:120}).withMessage('La edad debe ser un numero entero menor a 121'),

    (req, res, next) => {
        validateResultEditUser(req, res, next)
    }
]

module.exports = { validateCreateUser, validateEditUser }