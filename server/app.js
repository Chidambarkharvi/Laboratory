const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"})
require("./db/conn");
const cors = require("cors")

app.use(cors())

const user = require("./router/route")


app.use(express.urlencoded({extended:true}))

app.use(express.json());

app.use("/user",user)

// app.get("/", (req, res) => {
//   res.send("home");
// });

module.exports =app;