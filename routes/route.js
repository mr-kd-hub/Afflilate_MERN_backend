// const express = require('express');
// const bcrypt = require('bcrypt');
//const router = express.Router;
const router = require("express").Router();
const key = "$adfbaub$cadlvnkajdnv5515aeea";
const hash = "hvdvcvhvvgcvhgvs$";
const { tokenGenerator } = require("../util/tokenGenerator");

//models
const users = require("../models/signupModel");
const product = require("../models/productModel");
const category = require("../models/categoryModel");
const contactus = require("../models/contactModel");

//admin , add product
router.post("/addProduct", async (req, res) => {
  try {
    const flipkart_link = req.body.flipkart_link;
    const status = req.body.status;
    const category = req.body.category;
    const feature_to_home = req.body.feature_to_home;
    const name = req.body.name;
    if (!flipkart_link || !category || !status || !feature_to_home || !name) {
      return res.send({ success: false, msg: "Please Enter all fields.." });
    }

    const products = new product({
      flipkart_link: req.body.flipkart_link,
      status: req.body.status,
      category: req.body.category,
      feature_to_home: req.body.feature_to_home,
      name : req.body.name
    });
    //promise
    products
      .save()
      .then(() => {
        return res.send({
          success: true,
          msg: "Product Successfully Added",
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          msg: "Fail to Add Product : " + err,
        });
      });
  } catch (err) {
    return res.send({ success: false, msg: "error in category API" + err });
  }
});

//admin , add category
router.post("/addCategory", async (req, res) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const status = req.body.status;
    const feature_to_home = req.body.feature_to_home;
    const link = req.body.link;
    if (!title || !image || !status || !feature_to_home || !link) {
      return res.send({ success: false, msg: "Please Enter all fields.." });
    }
    category
      .findOne({ title })
      .then((user) => {
        if (user) {
          return res.send({ success: false, msg: "Category alredy exists..." });
        }
        const categories = new category({
          title: req.body.title,
          image: req.body.image,
          status: req.body.status,
          feature_to_home: req.body.feature_to_home,
          link:req.body.link
        });
        //promise
        categories
          .save()
          .then(() => {
            return res.send({
              success: true,
              msg: "Category Successfully Added",
            });
          })
          .catch((err) => {
            return res.send({
              success: false,
              msg: "Fail to Add Category : " + err,
            });
          });
      })
      .catch((err) => {
        return res.send({
          success: false,
          msg: "error in finding same category" + err,
        });
      });
  } catch (err) {
    return res.send({ success: false, msg: "error in category API" + err });
  }
});

//signup API
router.post("/signup", async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = key + req.body.password + hash;
    if (!email || !password || !fullname) {
      return res.send({ success: false, msg: "Please Enter all fields.." });
    }
    users
      .findOne({ email })
      .then((user) => {
        if (user) {
          return res.send({ success: false, msg: "User alredy exists..." });
        }

        const signedup = new users({
          fullname: req.body.fullname,
          email: req.body.email,
          password: password,
        });
        //promise
        signedup
          .save()
          .then((user) => {
            return res.send({
              success: true,
              msg: "Successfully Registerd",
              user,
            });
          })
          .catch((err) => {
            return res.send({
              success: false,
              msg: "Fail to Register : " + err,
            });
          });
      })
      .catch((err) => {
        return res.send({
          success: false,
          msg: "error in finding same username" + err,
        });
      });
  } catch (err) {
    return res.send({ success: false, msg: "error in signup API" + err });
  }
});

//to fetch products
router.get("/showProduct", async (req, res) => { 
  try {
      product.find({ status: 1, feature_to_home: 1 }).sort({_id:-1})
      .then((product)=>{
            if (product) {
                res.send({ success: true, msg: "Success", product });
            } else {
                res.send({ success: false, msg: "No Category To Display" });
            }
      })
      .catch((err)=>{
        console.log("error in fetch product api backend : \n"+err)
      })
  } catch (err) {
    res.send({ success: false, msg: "error in showCategory API : " + err });
  }
});

//to fetch AllProducts
router.get("/showAllProduct", async (req, res) => { 
    try {
        product.find({ status: 1 }).sort({_id:-1})
        .then((product)=>{
              if (product) {
                  res.send({ success: true, msg: "Success", product });
              } else {
                  res.send({ success: false, msg: "No Category To Display" });
              }
        })
        .catch((err)=>{
          console.log("error in fetch product api backend : \n"+err)
        })
    } catch (err) {
      res.send({ success: false, msg: "error in showCategory API : " + err });
    }
  });

//show categoey
router.get("/showCategory", async (req, res) => {
  try {
    category
      .find({ status: 1, feature_to_home: 1 }).sort({_id:-1})
      .then((user) => {
        if (user) {
          res.send({ success: true, msg: "Success", user });
        } else {
          res.send({ success: false, msg: "No Category To Display" });
        }
      })
      .catch((err) => {
        res.send({ success: false, msg: "error in Category Display : " + err });
      });
  } catch (err) {
    res.send({ success: false, msg: "error in showCategory API : " + err });
  }
});

//show allcategories
router.get("/showAllCategory", async (req, res) => {
    try {
      category
        .find({ status: 1 }).sort({_id:-1})
        .then((user) => {
          if (user) {
            res.send({ success: true, msg: "Success", user });
          } else {
            res.send({ success: false, msg: "No Category To Display" });
          }
        })
        .catch((err) => {
          res.send({ success: false, msg: "error in Category Display : " + err });
        });
    } catch (err) {
      res.send({ success: false, msg: "error in showCategory API : " + err });
    }
  });
  

//login API
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = key + req.body.password + hash;
    if (!email || !password) {
      return res.send({ success: false, msg: "Please Enter all fields" });
    }
    users
      .findOne({ email: email, password: password })
      .then((user) => {
        if (user) {
          const token = tokenGenerator(user.id);
          //res.send("id is : "+user)
          res.cookie("token", token, {
            expires: new Date(Date.now() + 86400000), //24h
            httpOnly: true,
          });

          res.send({ success: true, msg: "Success login", token });
        } else {
          res.send({ success: false, msg: "Wrong data" });
        }
      })
      .catch((err) => {
        res.send({ success: false, msg: "error in login : " + err });
      });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "error in login api : " + err });
  }
});

//contactusAPI
router.post("/contact", (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        if (!name || !email || !message) {
            return res.send({ success: false, msg: "Please Enter all fields" });
        }
        const customer = new contactus({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        });
        customer
        .save()
        .then(() => {
            return res.send({ success: true, msg: "Thank you For Contacting Us.."});
        })
        .catch((err) => {
            return res.send({ success: false, msg: "Not Contacted : " + err });
        });
    } 
    catch (err) {
        res.send({ success: false, msg: "error in contact API" });
    }
});

module.exports = router;