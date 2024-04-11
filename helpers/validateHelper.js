const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const validateResultCreateUser = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.render('users/create', { errors: errors.array(), formData: req.body });
        }
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

const validateResultEditUser = (req, res, next) => {
    try {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw errors
        }
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

const validateResultCreateCourse = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const token = req.cookies.token; 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
            res.locals.userId = decodedToken.id;
            res.locals.userRol = decodedToken.id_rol;
            res.locals.userUsuario = decodedToken.usuario;
            return res.render('courses/create', { errors: errors.array(), formData: req.body });
        }
        return next()
    } catch (err) {
        if (err instanceof Error) {
            // Manejo de errores internos del servidor
            res.status(500).send({ error: err.message });
        } else {
            // Manejo de otros tipos de errores
            res.status(403).send({ error: err.toString() });
        }
    }
}

const validateResultEditCourse = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw errors
        }
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

module.exports = { validateResultCreateUser, validateResultCreateCourse, validateResultEditCourse, validateResultEditUser }
