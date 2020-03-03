'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

/*/*for that he serve recognize the format json
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, x-Requested-whith, Content-Type, Accept")
    next();
   })*/
//for tha peticion at server
app.use('/api', api)

module.exports = app