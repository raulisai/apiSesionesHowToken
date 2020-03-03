'use strict'

const config = require('./config')
const app = require('./app')
const mongoose = require('mongoose')
mongoose.connect (config.db, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then (() => console.log ('Conexión a la base de datos establecida...'))
.catch (err => {
console.log ( "DB Connection Error:"+ err);
});
app.listen(config.port, () => console.log('server listening at '+ config.port))

