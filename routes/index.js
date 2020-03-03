'use strict'

const express = require('express')
const userCtrl= require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')




api.post('/singUp',userCtrl.signUp)
api.post('/singIn',userCtrl.singIn)
api.post('/singDown',userCtrl.SingOff)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
  })

module.exports = api