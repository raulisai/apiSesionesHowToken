'use strict'

const servToken = require('../services/token')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization
     

  servToken.decodeToken(token)
    .then(response => {
      req.user = response
      console.log(response)
      next()
    })
    .catch(response => {
      res.status(response.status).send(response.message)
      
      
    })
}

module.exports = isAuth