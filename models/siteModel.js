const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true        
    },
    mobile : {
        type : String,
        required: true
    },
    aboutus1 : {
        type : String,
        required: true,
    },
    aboutus2 : {
        type : String,
        required: true,
    },
    instagram : {
        type : String,
        required: true,
    },
    facebook : {
        type : String,
        required: true,
    },
    twitter : {
        type : String,
        required: true,
    },
    bannertitle:{
        type : String,
        required: true,
    },
    bannersubtitle:{
        type : String,
        required: true,
    },
    date : {
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model("siteSetting",siteSchema);