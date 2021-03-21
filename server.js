const express = require('express');
const app = express();
const mongoose = require('mongoose');
const roteUrl = require('./routes/route');
const cors = require('cors');

app.use(express.json());//middleware
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/affilate",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log("database connection error")
})

app.use("/api", roteUrl); 

app.listen(9000,()=>{console.log("servere is up and running")})