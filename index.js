const { Console } = require("console");
const express = require("express");
const app = express();
const bcrypt=require("bcrypt");
app.set('view engine', 'ejs');
const port=process.env.PORT||3000;
const path = require('path');
const User=require("./src/models/registers")
const { generateToken } = require("./src/helper/generateToken");
const jsonWeb = require("jsonwebtoken");
const router = express.Router();
app.set("views",path.join(__dirname,"/views"));


app.use(express.static("public"));

require("./src/db/conn");
const {json} = require("express");
const { name } = require("ejs");
// const { constrainedMemory } = require("process");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/shop",(req,res)=>{
    res.render("shop.ejs")
});
app.get("/blog",(req,res)=>{
    res.render("blog.ejs")
});
app.get("/cart",(req,res)=>{
    res.render("cart.ejs")
});
app.get("/login",(req,res)=>{
    res.render("login.ejs")
});
app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
});

app.post("/login", async (req, res) => {
    console.log(req.body);
  
    const { name, password } = req.body;
  
    try {
      let user = await User.findOne({ name });
      console.log(user);
      if (!user) {
        user = await User.findOne({ email: email });
      }
  
      if (!user) {
        return res.json({ success: false, message: "Invalid Credentials" });
      } else {
        const verify = await bcrypt.compare(password, user.password);
        if (!verify)
          return res.json({ success: false, message: "Invalid Credentials" });
        else {
            res.render("home.ejs");
        //   let token = await generateToken(user._id);
        //   console.log(token, user);
  
        //   return res.json({
        //     success: true,
        //     //token,
        //     user,
        //     message: "login successful",
        // });
          
        }
      }
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  });
  
  app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email,name, password} = req.body;
  
    if (!email || !name || !password )
      return res.json({ success: false, message: "All fields are required" });
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        name,
        password: hash,
        });

      console.log(user);
      if (user) {
        //let token = await generateToken(user._id);
  
        //console.log(token);
       // res.json({ success: true, message: "User Created", user,  });
        res.render("home.ejs");
      } else {
        res.json({ success: false, message: "Some error creating Account" });
      }
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "internal server error" });
    }
  });
//   router.get("/me", async (req, res) => {
//     try {
//       const { token } = req.headers;
//       if (!token)
//         return res
//           .status(401)
//           .json({ success: true, message: "user Unauthorized" });
  
//       const data = jsonWeb.verify(token, process.env.JWT_SECRET);
  
//       const user = await User.findById(data.id);
//       if (user) {
//         return res.json({ user, success: true, message: "user found" });
//       } else {
//         return res.status(404).json({ success: true, message: "user not found" });
//       }
//     } catch (error) {
//       res.json({
//         success: false,
//         message: "session has expire please login again",
//       });
//     }
//   });
  router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json({ users, success: true, message: "users found" });
  });
  module.exports = router;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})