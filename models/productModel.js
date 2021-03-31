const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    flipkart_link : {
        type : String,
        required: true
    },
    status : {
        type : Boolean,
        required: true,
        default:1
    },
    category : {
        type : String,
        required: true
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
module.exports = mongoose.model("product",productSchema);