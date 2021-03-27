const express = require('express');
//const router = express.Router;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const key = '$adfbaub$cadlvnkajdnv5515aeea';
const hash = 'hvdvcvhvvgcvhgvs$';
const { tokenGenerator } = require('../util/tokenGenerator');

//models
const users = require('../models/signupModel');
const contact = require('../models/contactModel');

//signup API
router.post('/signup', async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = key + req.body.password + hash;
    if (!email || !password || !fullname) {
      return res.send({ success: false, msg: 'Please Enter all fields' });
    }
    users
      .findOne({ email })
      .then((user) => {
        if (user) {
          return res.send({ success: false, msg: 'user alredy exists' });
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
              msg: 'Successfully Registerd',
              user,
            });
          })
          .catch((err) => {
            return res.send({
              success: false,
              msg: 'error in registration : ' + err,
            });
          });
      })
      .catch((err) => {
        return res.send({success: false,msg: 'error in finding same username' + err});
      });
  } catch (err) {
    return res.send({ success: false, msg: 'error in signup API' + err });
  }
});

//login API
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = key + req.body.password + hash;
    if (!email || !password) {
      return res.send({ success: false, msg: 'Please Enter all fields' });
    }
    users
      .findOne({ email: email, password: password })
      .then((user) => {
        if (user) {          
          const token = tokenGenerator(user.id);
          res.send({ success: true, msg: 'Success login', token });
        } 
        else {        
          res.send({ success: false, msg: 'Wrong data' });
        }
      })
      .catch((err) => {
        res.send({ success: false, msg: 'error in login : ' + err });
      });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: 'error in login api : ' + err });
  }
});

//contactusAPI
router.post('/contact', (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    if (!name || !email || !message) {
      return res.json({ success: false, msg: 'Please Enter all fields' });
    }
    const customer = new contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    customer
      .save()
      .then((user) => {
        return res.json({ success: true, msg: 'Successfully Contacted' ,user });
      })
      .catch((err) => {
        return res.json({ success: false, msg: 'not Contacted : ' + err });
      });
  } catch (err) {
    res.json({ success: false, msg: 'error in contact API' });
  }
});

module.exports = router;
