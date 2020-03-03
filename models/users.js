'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema




const UserSchema= new Schema({
    email: { type: String, lowercase: true },
    password: { type: String },
    quote:{ type: String, default: "you have no quote" }
})


const User = mongoose.model('User',UserSchema)
module.exports = User