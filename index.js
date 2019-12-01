const express = require('express')
const bodyParser = require('body-parser')
const app = express()


//Port general
const _Port=1244

//db
const mongoose = require('mongoose')
const MONGO_URI='mongodb://localhost:27017/angulardb-youproyect'

mongoose
.connect (MONGO_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then (() => console.log ('DB Connected!'))
.catch (err => {
console.log ( "DB Connection Error:"+ err);
});
/*/other form
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/angulardb-youproyect')
.then(() => console.log('Mongoose up'))
*/

const User=require('./models/users')



//for tha peticion at server
app.use((req,res,next) =>{
 res.header("Access-Control-Allow-Origin","*")
 res.header("Access-Control-Allow-Headers","Origin, x-Requested-whith, Content-Type, Accept")
 next();
})




//for that he serve recognize the format json
app.use(bodyParser.json())


app.post('/login', async(req,res) => {
const {email,password}= req.body
console.log(email +" "+ password)
const resp = await User.findOne({email,password})
if(!resp){
console.log("incorrect details")
 }else {
console.log("Loggin you in")

 }
 res.send("ok")
})///end loggin


app.post('/register', async(req,res) => {
//console.log(req.body)
 const {email, password} = req.body
 const user = new User({
      email,
      password
 })

 const result = await user.save()
 console.log(result)
 res.json(result)


})//end register






app.listen(_Port, () => console.log('server listening at '+ _Port))

