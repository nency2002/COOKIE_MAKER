const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const otpgenerator = require("otp-generator");
const User = require('../models/user.schema');
require("dotenv").config();


// signup with jwt bcrypt

const SignupData = async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email , number: req.body.number});
        if (data) {
            return res.json({ success: 'User already exists' });
        }
        else {
            let { firstname, lastname,  image ,number ,  email, password } = req.body
            bcrypt.hash(password, 5, async (err, hash) => {
                let obj = {
                    firstname: firstname,
                    lastname: lastname,
                    image:image,
                    number:number,
                    email: email,
                    password: hash
                }
                let val = await User.create(obj);
                let token = jwt.sign({ id: val.id }, "token");
                res.cookie("token", token);
                res.redirect('/User/Home');
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
        const { email, password } = req.body;
        const data = await User.findOne({ email: email });
        if (data) {
            bcrypt.compare(password, data.password,async (err, result) => {
                if (result) {
                    let token = jwt.sign({ id: data._id }, "token");
                    res.cookie("token", token).redirect('/User/Home')
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
            res.redirect("/User/Login")

        }
        else {
            res.send("user not found");
        }
    }
    else {
        res.send("wrong otp")
    }
}

module.exports ={SignupData ,LoginData ,Reset ,Verify}


