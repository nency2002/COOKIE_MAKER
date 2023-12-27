const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    Fsname:String, 
    Lsname : String,
    Img:String,
    Emails : String, 
    Passwords : String,
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin