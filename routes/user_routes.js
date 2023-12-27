const {Router}  = require("express");
const { SignupData, LoginData, Reset, Verify } = require("../controllers/user_controllers");

const  UserRouter = Router();

// signup with jwt bcrypt
UserRouter.post("/Signup", SignupData)

//login with jwt bcrypt
UserRouter.post("/Login", LoginData)

// reset password nodemailer
UserRouter.post("/Sendmail", Reset)
UserRouter.post("/Verify",Verify )

// logout
UserRouter.get('/Logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).redirect('/User/Login');
  });

module.exports =UserRouter

