const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenSign = async (user) =>{
    return jwt.sign(
        {
            id: user.id,
            id_rol: user.id_rol,
            usuario: user.usuario
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    )
}

const verifyToken = async (token) =>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (e)
    {
        return null
    }
}

module.exports = {
    tokenSign,
    verifyToken
    
}