const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true        
    },
    image : {
        type : String,
        required: true
    },
    status : {
        type : Boolean,
        required: true,
        default:1
    },
    feature_to_home : {
        type : Boolean,
        required: true,
        default:1
    },
    date : {
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model("category",categorySchema);