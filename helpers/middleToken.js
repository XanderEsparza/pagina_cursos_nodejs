const { verifyToken } = require('../helpers/generateToken');
const cookieParser = require('cookie-parser');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Obtener el token desde la cookie
        console.log(req.cookies.token)
        if (!token) {
            res.status(409);
            return res.send({ error: 'No tienes acceso' });
        }
        const tokenData = await verifyToken(token);
        if (tokenData.id) {
            next();
        } else {
            res.status(409);
            res.send({ error: 'No tienes acceso' });
        }
    } catch(e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'No entro al try' });
    }
};

module.exports = {
    checkAuth
};