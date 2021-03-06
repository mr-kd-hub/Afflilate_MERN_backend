const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const roteUrl = require('./routes/route');
const cors = require('cors');
// const helmet = require("helmet");

dotenv.config({path:'./.env'});
app.use(express.json());//middleware
app.use(cors());
// app.use(helmet());
//"mongodb://127.0.0.1:27017/affilate"
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log("database connection error")
})

app.use("/api", roteUrl); 

app.listen(process.env.PORT,()=>{console.log("servere is up and running")})