const mongoose = require('mongoose');
const validator = require('validator');


const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true        
    },
    email : {
        type : String,
        required: true
    },
    message : {
        type : String,
        required: true
    },
    date : {
        type:Date,
        default: Date.now
    }
})
//collection(users) creation
module.exports = mongoose.model("contact",contactSchema);