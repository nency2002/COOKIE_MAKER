const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:String, 
    lastname : String,
    image:String, 
    number:Number,
    email : String, 
    password : String,
})

const User = mongoose.model('User', UserSchema)

module.exports = User