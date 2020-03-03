'use strict'

const User = require('../models/users')
const servToken = require('../services/token')

function singIn(req,res){
    var email= req.body.email
    var password = req.body.password
    var passEncriptada = servToken.encriptarToken(email,password)
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })
        
        if(user){
            if(user.password === passEncriptada) {
                req.user = user
                res.status(200).send({
                  message: 'Te has logueado correctamente',
                  token : servToken.createToken(user)
                   
                })
            }else res.send('contraseña incorrecta')
        }
        
      })


    }///end loggin





async function signUp(req,res){
console.log(req.body)
 const email = req.body.email
 const password = req.body.password
 var passEncriptada = servToken.encriptarToken(email, password)
 User.findOne({email:email}, async function(err, user){
    if(!user) {
        const user = new User({
          email : email,
          password : passEncriptada
       })
  await user.save((err) =>{
     if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
     let resss= servToken.createToken(user)
     console.log(resss)
     return res.status(201).send({token: servToken.createToken(user)})
     
 })

    }else {
        res.send(' ya existe este usuario')   
    }
})

}//end register


function SingOff(req,res){
    
    const token = req.headers.authorization
try{
    jwtr.destroy(token)
    res.res.status(200).send({ message: `Se cerro la sesion` })
}catch (err){
   if(err) return res.status(500).send({ message: `Error al crear al cerrar sesion: ${err}` })
}    
}//end sesion




module.exports = {
    signUp,
    singIn,
    SingOff
  }