const mongoose = require("mongoose");

const Cartschema = new mongoose.Schema({
    productID :  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qty : {type:Number , default:1},
})

let cart = mongoose.model("Cart", Cartschema)

module.exports = cart