const {Router}  = require("express");
const { Signup, Login, Post, Profile, Data, Home, Otp, Reset } = require("../controllers/admin_con");
const { IsAuth } = require("../middleware/auth");


const  AdminGet = Router();

AdminGet.get("/Signup" ,Signup)
AdminGet.get("/Login" , Login)
AdminGet.get("/Post" ,IsAuth ,Post)
AdminGet.get("/Profile" ,IsAuth , Profile)
AdminGet.get("/Data" , IsAuth ,Data)
AdminGet.get("/Home" , Home)
AdminGet.get("/Otp" ,Otp )
AdminGet.get("/Reset" , Reset)




module.exports =AdminGet