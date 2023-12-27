const Signup =  (req , res) => {
    res.render("admin_signup")
}

const Login =  (req , res) => {
    res.render("admin_login")
}

const Post =  (req , res) => {
    res.render("admin_post")
}

const Profile =  (req , res) => {
    res.render("admin_profile")
}

const Data =  (req , res) => {
    res.render("admin_data")
}

const Home =  (req , res) => {
    res.render("admin_home")
}

const Otp =  (req , res) => {
    res.render("otp")
}

const Reset =  (req , res) => {
    res.render("admin_reset")
}

module.exports = {Signup , Login , Post , Profile , Data , Home , Otp  , Reset}