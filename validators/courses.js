const { check } = require('express-validator');
const { validateResultCreateCourse, validateResultEditCourse } = require('../helpers/validateHelper');

const validateCreateCourse = [
    check('titulo')
        .exists().withMessage('El título es requerido')
        .isLength({ max: 25 }).withMessage('El título no puede tener más de 25 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('Ingresa un título válido'),

    check('categoria')
        .exists().withMessage('La categoría es requerida')
        .isLength({ max: 20 }).withMessage('La categoría no puede tener más de 20 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('Ingresa una categoría válida'),

    check('descripcion')
        .exists().withMessage('La descripción es requerida')
        .isLength({ max: 250 }).withMessage('La descripción no puede tener más de 250 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ%;:.,$“”¡!¿?()#*-]+$/).withMessage('Ingresa una descripción válida'),

    check('precio')
        .exists().withMessage('El precio es requerido')
        .isNumeric().withMessage('Ingresa un precio válido'),

    check('nivel')
        .exists().withMessage('El nivel es requerido')
        .isNumeric().withMessage('Ingresa un nivel válido'),

    check('objetivos')
        // .optional()
        .isLength({ max: 250 }).withMessage('Los objetivos no pueden tener más de 250 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ%;:.,$“”¡!¿?()#*-]+$/).withMessage('Ingresa objetivos válidos'),


    (req, res, next) => {
        validateResultCreateCourse(req, res, next)
    }
]

const validateEditCourse = [
    check('titulo')
        .exists().withMessage('El título es requerido')
        .isLength({ max: 25 }).withMessage('El título no puede tener más de 25 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('Ingresa un título válido'),

    check('categoria')
        .exists().withMessage('La categoría es requerida')
        .isLength({ max: 20 }).withMessage('La categoría no puede tener más de 20 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/).withMessage('Ingresa una categoría válida'),

    check('descripcion')
        .exists().withMessage('La descripción es requerida')
        .isLength({ max: 250 }).withMessage('La descripción no puede tener más de 250 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ%;:.,$“”¡!¿?()#*-]+$/).withMessage('Ingresa una descripción válida'),

    check('precio')
        .exists().withMessage('El precio es requerido')
        .isNumeric().withMessage('Ingresa un precio válido'),

    check('nivel')
        .exists().withMessage('El nivel es requerido')
        .isNumeric().withMessage('Ingresa un nivel válido'),


    (req, res, next) => {
        validateResultEditCourse(req, res, next)
    }
]

module.exports = { validateCreateCourse, validateEditCourse }