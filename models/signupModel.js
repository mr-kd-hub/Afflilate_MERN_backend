const mongoose = require('mongoose');
const validator = require('validator');

const signupSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        
    },
    email : {
        type : String,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email");
            }
        }
    },
    password : {
        type : String,
        required: true,
        minLength : 3
    },
    date : {
        type:Date,
        default: Date.now
    }
})
//collection(users) creation
module.exports = mongoose.model("users",signupSchema);