const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const otpgenerator = require("otp-generator");
const Razorpay = require('razorpay');
const Product = require("../models/product.schema");
const Admin = require('../models/admin.schema');
const cart = require('../models/cart.schema');
require("dotenv").config();

// signup with jwt bcrypt

const SignData =  async (req, res) => {
    let data = await Admin.find();
    res.send(data);
}

const SignupData = async (req, res) => {
    try {
        let data = await Admin.findOne({ email: req.body.email });
        if (data) {
            return res.json({ success: 'User already exists' });
        }
        else {
            let { Fsname, Lsname,  Img ,  Emails, Passwords } = req.body
            bcrypt.hash(Passwords, 5, async (err, hash) => {
                let obj = {
                    Fsname: Fsname,
                    Lsname: Lsname,
                    Img:Img,
                    Emails: Emails,
                    Passwords: hash
                }
                let val = await Admin.create(obj);
                let user = jwt.sign({ id: val.id }, "user");
                res.cookie("user", user);
                res.redirect('/Admin/Post');
            })
        }
    }
    catch (error) {
        return res.json({ error: error.message });
    }
}

// login with jwt bcrypt

const LoginData = async (req, res) => {
    try {
        const { Emails, Passwords } = req.body;
        const data = await Admin.findOne({ Emails: Emails });
        if (data) {
            bcrypt.compare(Passwords, data.Passwords,async (err, result) => {
                if (result) {
                    let user = jwt.sign({ id: data._id }, "user");
                    res.cookie("user", user).redirect('/Admin/Home')
                }
                else {
                    res.send("paassword incorrent");
                }
            })
        }
    }
    catch (error) {
        return res.json({ error: error.message });
    }
}


// forget password nodemailer

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.RESET_USERNAME,
        pass: process.env.RESET_PASS
    }
})

let otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
console.log(otp);


const Reset = (req, res) => {
    let { email } = req.body
    const mailoption = {
        from: process.env.RESET_USERNAME,
        to: email,
        subject: "Reset Password",
        html: `otp : ${otp} `
    }
    transporter.sendMail(mailoption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
    res.redirect("/Admin/Otp")
}


const Verify = async (req, res) => {
    let { cotp, password, email } = req.body;
    if (cotp == otp) {
        let userdata = await User.findOne({ email: email })
        if (userdata) {
            userdata.password = password
            await userdata.save();
            res.redirect("/Admin/Login")

        }
        else {
            res.send("user not found");
        }
    }
    else {
        res.send("wrong otp")
    }
}


// pdoduct post
const Post =  async (req, res) => {
    let data = await Product.create(req.body);
    res.send(data);
}

// post karela data dekhay
const Products =  async (req, res) => {
    let data = await Product.find({userID : req.body.userID});
    res.send(data);
}
// data delete karva
const Deletes =  async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    let data = await Product.find({userID : req.body.userID});
    res.send(data);
}

// data update  karva
const Updatedata= async (req, res) => {
    let { id } = req.params;
    let data = await Product.findByIdAndUpdate(id, req.body);
    try {
        if (data) res.send("updated");
        else {
            res.send("not found");
        }
    } catch (error) {
        res.send("testing");
    }
};

const Updates  =async (req,res)=>{
    const {id} = req.params;
    
    let udata = await Product.findById(id);
    res.render("admin_update", {udata});
}

// badha data get karva
const All =  async (req, res) => {
    let data = await Product.find();
    res.send(data);
}
// single pages
const Singles = async (req, res) => {
    let {id} = req.params;
    let Single = await Product.findById({_id: id});
    res.render("user_single",{Single});
}


 // cart
 const Cart = async (req, res) => {
    let data = await cart.create(req.body);
    res.send(data);
}

const CartDatas = async (req , res)=>{
    let data = await cart.find({userID : req.body.userID}).populate('productID');
    res.send(data);
}

const cartqty = async (req, res) =>{
    let {id} = req.params
    let {val} = req.body
    let data = await cart.findById(id)
    if(data.qty ==1 & val == -1){
        await cart.findByIdAndDelete(id);
        return res.send({status : "success"})
    }
   
    data.qty = data.qty+val
    await data.save()
    res.send(data);
}

// payments
var razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET,
  });

  const payments = async (req, res) =>{
        let {amount} = req.body
        let options ={
            amount : amount*100,
        }
        razorpay.orders.create(options , (err, order) =>{
            if(err){
                console.log(err);
                res.send({data : err.message});
            }
            else{
                res.send(order)
            }
        })
  }

module.exports = {  Reset, Verify , Post  , Products , Deletes , All , Singles , Updates , Updatedata , SignupData , LoginData, SignData , Cart ,CartDatas , cartqty , payments}