const Signup =  (req , res) => {
    res.render("user_signup")
}

const Login =  (req , res) => {
    res.render("user_login")
}

const Home =  (req , res) => {
    res.render("user_home")
}

const Product =  (req , res) => {
    res.render("user_product")
}
const Profile =  (req , res) => {
    res.render("user_profile")
}

const Cart =  (req , res) => {
    res.render("user_cart")
}

const Single =  (req , res) => {
    res.render("user_single")
}

const Reset =  (req , res) => {
    res.render("user_reset")
}

module.exports = {Signup , Login , Home , Product , Profile,Cart , Single ,  Reset}