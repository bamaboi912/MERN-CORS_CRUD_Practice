const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Middleware
app.use(express.json());
const cors = require("cors");

app.use(cors());
//define backend port
const PORT = 3002

//establish link to MongoDB

mongoose.connect("mongodb+srv://bamaboi912:Student1234!@cluster0.yjjlgsl.mongodb.net/CapeHealthCare?retryWrites=true&w=majority").then(() => console.log
("Connected To Database"))
.then(()=>console.log("Backend Server Listening on Port:"+ PORT))
.then(()=>{
    app.listen(PORT)
}).catch((err)=>console.log(err));