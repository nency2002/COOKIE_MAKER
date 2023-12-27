const express = require("express");
const cookie = require('cookie-parser');
const Connect = require("./config/db");
const AdminRouter = require("./routes/admin_routes");
const UserRouter = require("./routes/user_routes");
const UserGet = require("./routes/user_rou");
const AdminGet = require("./routes/admin_rou");

require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cookie())




// ejs code
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended : true }));

app.use("/Admin" , AdminRouter)
app.use("/Admin" , AdminGet)
app.use("/User" , UserRouter)
app.use("/User" , UserGet)





Connect();
app.listen(process.env.PORT , ()=>{
    console.log(`listening on ${process.env.PORT}`);
});