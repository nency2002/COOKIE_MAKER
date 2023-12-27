const { Router } = require("express");
const { Reset, Verify, Post, Products, Deletes, All, Singles, Updates, Updatedata, SignupData, LoginData, SignData, Cart, CartDatas, cartqty, payments } = require("../controllers/admin_controllers");


const AdminRouter = Router();

// signup with jwt bcrypt
AdminRouter.post("/Signup",SignupData )
AdminRouter.get("/Signups", SignData)


//login with jwt bcrypt
AdminRouter.post("/Login", LoginData)

// reset password nodemailer
AdminRouter.post("/Sendmail", Reset)
AdminRouter.post("/Verify", Verify)


// post data
AdminRouter.post("/Post" , Post )

// post karela data dekhay

AdminRouter.get("/Products" , Products )

// data delete karva
AdminRouter.delete("/Delete/:id",  Deletes )  
// update
AdminRouter.get("/Update/:id" , Updates )  
AdminRouter.patch("/Edit/:id", Updatedata) 


// badha data get karva
AdminRouter.get("/All" ,All  )

// single pages
AdminRouter.get('/Single/:id',Singles)

// logout
AdminRouter.get('/Logout', (req, res) => {
    res.clearCookie('user');
    return res.status(200).redirect('/Admin/Logindata');
  });


  // cart

  AdminRouter.post("/Cart/:id",Cart);
  AdminRouter.get("/CartData" ,CartDatas )
  AdminRouter.patch("/Crat/Update/:id"  , cartqty)

  // payment

  AdminRouter.post("/Payment" , payments)
module.exports = AdminRouter