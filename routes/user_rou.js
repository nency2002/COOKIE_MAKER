const {Router}  = require("express");
const { Signup, Login, Home, Product, Profile, Cart, Single, Reset } = require("../controllers/user_con");
const { Auth } = require("../middleware/auth");




const  UserGet = Router();

UserGet.get("/Signup" ,Signup)
UserGet.get("/Login" , Login)
UserGet.get("/Home" , Home)
UserGet.get("/Product" ,Product )
UserGet.get("/Profile" , Auth,Profile)
UserGet.get("/Reset" , Reset)
UserGet.get("/Cart" ,Auth ,Cart)
UserGet.get("/Single" ,Single )




module.exports =UserGet