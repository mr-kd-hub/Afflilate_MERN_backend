const router = require("express").Router();
const key = "$adfbaub$cadlvnkajdnv5515aeea";
const hash = "hvdvcvhvvgcvhgvs$";
const { tokenGenerator } = require("../util/tokenGenerator");
//models
const users = require("../models/signupModel");
const product = require("../models/productModel");
const category = require("../models/categoryModel");
const contactus = require("../models/contactModel");
const site = require("../models/siteModel");

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
//admin update status of product
router.patch("/statusProduct/:status/:id",async(req,res)=>{
  const id = req.params.id;
  const status = req.params.status;
  let a;
  if(status)
  {
      a="Activated"
  }
  else
  {
      a="Deactivated"
  }
  try{
      product
      .findByIdAndUpdate({"_id": id},{"status": status},{new: true})
      .then(()=>{
        return res.send({success: true,msg: `Product ${a} Successfully..`})
      })
      .catch((err)=>{
        console.log(err)
        return res.send({success: false,msg: `Product Not ${a}..`+err,err})
      })
  }
  catch(err)
  {
    return res.send("Error in Status Update Api : "+err)
  }

});
//admin update status category
router.patch("/statusCategory/:status/:id",async(req,res)=>{
  const id = req.params.id;
  const status = req.params.status;
  let a;
  if(status)
  {
      a="Activated"
  }
  else
  {
      a="Deactivated"
  }
  try{
      category
      .findByIdAndUpdate({"_id": id},{"status": status})
      .then(()=>{
        return res.send({success: true,msg: `Category ${a} Successfully..`})
      })
      .catch((err)=>{
        return res.send({success: false,msg: `Category Not ${a}..`,err})
      })
  }
  catch(err)
  {
    return res.send("Error in Status Update Api : "+err)
  }

});
//admin delete product
router.delete("/deleteProduct/:id",async(req,res)=>{
  try{
      const id = req.params.id;
      product.
      deleteOne( { _id: id } )
      .then(() => {
        return res.send({success: true,msg: "Product Deleted.."})
      })
      .catch((err)=>{
        return res.send({success: false,msg: "Product Not Found.."})
      })
      
  }catch(err){return res.send({ success: false, msg: "error in Product Delete API" + err });}
});
//admin delte category
router.delete("/deleteCategory/:id",async(req,res)=>{
  try{
      const id = req.params.id;
      category.
      deleteOne( { _id: id } )
      .then(() => {
        return res.send({success: true,msg: "Category Deleted.."})
      })
      .catch((err)=>{
        return res.send({success: false,msg: "Category Not Found.."})
      })
      
  }catch(err){return res.send({ success: false, msg: "error in Product Delete API" + err });}
});

//admin , add category
router.post("/addCategory", async (req, res) => {
  try {
    console.log(req.file)
    const title = req.body.title;
    const image = req.body.image;
    const status = req.body.status;
    const feature_to_home = req.body.feature_to_home;
    const link = req.body.link;
    if (!title || !image || !status || !feature_to_home || !link) {
      return res.send({ success: false, msg: "Please Enter all fields.." });
    }
    category
      .findOne({ title  })
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
//admin dropdown category
router.get("/showCategorylistAdmin",async(req,res)=>{
  try{
    category
    .find({}, {title:1, _id:0} )
    .then((categoryTitle)=>{
      if (categoryTitle) {
        res.send({ success: true, msg: "Success", categoryTitle });
    }
    })
    .catch((err)=>{
      console.log("error in fetch category name api backend : \n"+err)
    });
  }
  catch(err)
  {
      res.send({ success: false, msg: "error in showCategoryList API : " + err });
  }
})
//show product admin
router.get("/showProductAdmin", async (req, res) => { 
  try {
      product.find().sort({_id:-1})
      .then((product)=>{
            if (product) {
                res.send({ success: true, msg: "Success", product });
            } else {
                res.send({ success: false, msg: "No Products To Display" });
            }
      })
      .catch((err)=>{
        console.log("error in fetch product api backend : \n"+err)
      })
  } catch (err) {
    res.send({ success: false, msg: "error in showCategory API : " + err });
  }
});
//admin show users
router.get('/users',async(req,res)=>{
  try{
    users
    .find({},{_id:1,fullname:1,email:1,date:1}).sort({_id:-1})
    .then((userData)=>{
        res.send({success:true,msg:"Successfulley User Fetched...",userData})
    })
    .catch((err)=>{
      res.send({success:false,msg:"User Not Fetched..."})
    })
  }
  catch(err)
  {
    res.send({ success: false, msg: "error in Users Display API : " + err });
  }
});
//admin show feedback
router.get('/feedback',async(req,res)=>{
  try{
    contactus
    .find({},{_id:0,name:1,email:1,message:1,date:1}).sort({_id:-1})
    .then((feedback)=>{
        res.send({success:true,msg:"Successfulley Feedback Fetched...",feedback})
    })
    .catch((err)=>{
      res.send({success:false,msg:"Feedback Not Fetched..."})
    })
  }
  catch(err)
  {
    res.send({ success: false, msg: "error in Users Display API : " + err });
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
//show Allcategoey Admin
router.get("/showCategoryAdmin", async (req, res) => {
  try {
    category
      .find().sort({_id:-1})
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
router.post("/login",  (req, res) => {
  try {
    const email = req.body.email;
    const password = key + req.body.password + hash;
    if (!email || !password) {
      return res.send({ success: false, msg: "Please Enter all fields" });
    }
    //admin
    if(req.body.is_staff)
    {
        users.findOne({ email: email, password: password,is_staff:1 })
        .then((user) => {
          if(user)
          {
            const token = tokenGenerator(user.id);
            const flag=1;
            res.send({ success: true, msg: "Success login admin", token,flag });
            
          }
          else {
            res.send({ success: false, msg: "Wrong data" });
          }
        })
        .catch((err)=>{
          res.send({ success: false, msg: "error in admin login : " + err });
        })
    }
    //admin end
    users
      .findOne({ email: email, password: password })
      .then((user) => {
        if (user) 
        {
          const token = tokenGenerator(user.id);
          //res.send("id is : "+user)
          res.cookie("token", token, {
            expires: new Date(Date.now() + 86400000), //24h
            httpOnly: true,
          });
          res.send({ success: true, msg: "Success login", token });
        }
        else {
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
//show  single category for update
router.get("/Category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    category
      .find({ _id: id },{_id:0,title:1,image:1,link:1})
      .then((info) => {
        if (info) {
          res.send({ success: true, msg: "Success", info });
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
//update category data admin
router.patch("/updateCate/:id",async(req,res)=>{
  const id = req.params.id;
  const title = req.body.title;
  const image = req.body.image;
  const link = req.body.link;
try{
  category.
  findOneAndUpdate( { _id: id }, {$set:{"title": title,"image":image,"link":link}},{new: true} )
  .then((data) => {
    return res.send({success: true,msg: "Updated..",data})
  })
  .catch((err)=>{
    return res.send({success: false,msg: "Not Updated.. "+err})
  })
  
}catch(err){return res.send({ success: false, msg: "error in Product Delete API" + err });}
});
//show sitedata admin
router.get("/showSite/:id", async (req, res) => { 
  try {
    const id = req.params.id;
      site.find({ _id: id },{_id:0,email:1,mobile:1,aboutus1:1,aboutus2:1,instagram:1,facebook:1,twitter:1,bannertitle:1,bannersubtitle:1})
      .then((setting)=>{
            if (setting) {
                res.send({ success: true, msg: "Success", setting });
            } else {
                res.send({ success: false, msg: "No Products To Display" });
            }
      })
      .catch((err)=>{
        console.log("error in fetch product api backend : \n"+err)
      })
  } catch (err) {
    res.send({ success: false, msg: "error in showCategory API : " + err });
  }
});
//update SiteData admin
router.patch("/updateSite/:id",async(req,res)=>{
  const id = req.params.id;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const aboutus1 = req.body.aboutus1;
  const aboutus2 = req.body.aboutus2;
  const instagram = req.body.instagram;
  const facebook = req.body.facebook;
  const twitter = req.body.twitter;
  const bannertitle = req.body.bannertitle;
  const bannersubtitle = req.body.bannersubtitle;
try{
  site.
  findOneAndUpdate( { _id: id }, {$set:{"email": email,"mobile":mobile,"aboutus1":aboutus1,"aboutus2":aboutus2,"instagram":instagram,"facebook":facebook,"twitter":twitter,"bannertitle":bannertitle,"bannersubtitle":bannersubtitle}},{new: true} )
  .then((data) => {
    return res.send({success: true,msg: "Site Updated..",data})
  })
  .catch((err)=>{
    return res.send({success: false,msg: "Not Updated.. "+err})
  })
  
}catch(err){return res.send({ success: false, msg: "error in Product Delete API" + err });}
});
//insert site data
router.post("/addSite", (req, res) => {
  try {
   

      const siteData = new site({
         email : req.body.email,
        mobile : req.body.mobile,
        aboutus1 : req.body.aboutus1,
        aboutus2 : req.body.aboutus2,
        instagram : req.body.instagram,
        facebook : req.body.facebook,
        twitter : req.body.twitter,
        bannertitle : req.body.bannertitle,
        bannersubtitle : req.body.bannersubtitle
      });
      siteData
      .save()
      .then(() => {
          return res.send({ success: true, msg: "Thank you For Contacting Us.."});
      })
      .catch((err) => {
          return res.send({ success: false, msg: "Not Contacted : " + err });
      });
  } 
  catch (err) {
      res.send({ success: false, msg: "error in site API"+err });
  }
});
module.exports = router;