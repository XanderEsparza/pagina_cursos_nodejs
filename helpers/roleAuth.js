const {verifyToken} = require('../helpers/generateToken')
const userModel = require('../models').User;

const checkRoleAuth = (roles) => async (req, res, next) =>{
    try{
        
        const token = req.cookies.token; // Obtener el token desde la cookie
        const tokenData = await verifyToken(token)
        const userData = await userModel.findByPk(tokenData.id)
        
        if([].concat(roles).includes(userData.id_rol)){
            next()
        }
        else{
            res.status(409)
            res.send({error: 'No tienes acceso'})
        }
        
        
    }
    catch(e)
    {
        console.log(e)
        res.status(409)
        res.send({error: 'No entro al try'})
    }
}

module.exports = checkRoleAuth;
