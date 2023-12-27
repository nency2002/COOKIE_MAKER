// database ma connect karva

const mongoose = require('mongoose');
require("dotenv").config();

const Connect = async() =>{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect to MongoDB");
}

module.exports = Connect