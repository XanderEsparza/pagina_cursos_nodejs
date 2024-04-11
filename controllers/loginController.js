const { compare } = require('../helpers/handleBcrypt');
const userModel = require('../models/').User
const sequelize = require('../config/config.json');
const {tokenSign, verifyToken} = require('../helpers/generateToken')
const logger = require('../helpers/logger')






const login = (req,res)=>{ 
    res.render('login/login');
}

const auth = async (req, res) => {   
    try {
        const { usuario, password } = req.body;
        const user = await userModel.findOne({ where: { usuario } });
        if (!user) {
            res.status(404);
            return res.send({ error: 'Usuario no encontrado' });   
        }

        const checkPassword = await compare(password, user.password);
        if (checkPassword) {
            const tokenSession = await tokenSign(user);
            res.cookie('token', tokenSession, { httpOnly: true }); // Establecer la cookie con el token
            logger.info('El usuario '+ usuario + ' ha iniciado sesión');
            res.redirect('/courses/show');
        } else {
            res.status(409);
            res.send({ error: 'Contraseña incorrecta' });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = (req, res) => {
    // Eliminar la cookie de sesión estableciendo una cookie expirada
    res.cookie('token', '', { expires: new Date(0) }); // Establecer la fecha de vencimiento en el pasado
    res.redirect('/login'); // Redirigir a la página de inicio de sesión u otra página de tu elección
};

module.exports = {
    login,
    auth,
    logout
} 