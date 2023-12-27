const mongoose = require('mongoose')

const ProSchema = new mongoose.Schema({
    image:String,
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    title:String,
    weight:Number,
    price:Number,
    userID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Product = mongoose.model('Product' , ProSchema)

module.exports = Product