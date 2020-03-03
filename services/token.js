'use strict'


const jwt =require ('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {

    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix() 
    }

    return jwt.encode(payload,config.SECRET_TOKEN)

}


function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, config.SECRET_TOKEN)
        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'El token ha expirado'
          })
        }
        resolve(payload.sub)
      }catch (err) {
        reject({
          status: 500,
          message: 'Invalid Token'
        })
      }
    })
  
    return decoded
  }

  
//funcion de encriptar
function encriptarToken(user, pass) {
  var crypto = require('crypto')
  // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
  var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
  return hmac
}
  
  module.exports = {
    createToken,
    decodeToken,
    encriptarToken
  }

