//token verify karava

const jwt = require("jsonwebtoken");

const Auth = ( req , res , next)=>{
    let {user}  = req.cookies;
    if(user){
        let decoded = jwt.verify(user , "user");
        req.body.userID = decoded.id;
        next();
    }
    else{
        res.redirect('/User/Login');
    }
}


const IsAuth = ( req , res , next)=>{   
    let {user}  = req.cookies;
    if(user){
        let decoded = jwt.verify(user , "user");
        req.body.userID = decoded.id;
        next();
    }
    else{
        res.redirect('/Admin/Login');
    }
}
module.exports = {Auth , IsAuth} ;