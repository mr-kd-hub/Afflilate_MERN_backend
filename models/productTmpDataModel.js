const mongoose = require("mongoose");

const productTmpDataSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  rating: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  img: {
    type: String,
  },
  // color:{

  // }
});
module.exports = mongoose.model("productTmpData", productTmpDataSchema);
