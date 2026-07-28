const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Create Admin
router.post("/register", async (req,res)=>{

  try{

    const {name,email,password}=req.body;

    const existingAdmin = await Admin.findOne({email});

    if(existingAdmin){
      return res.status(400).json({
        message:"Admin already exists"
      });
    }


    const hashedPassword = await bcrypt.hash(password,10);


    const admin = new Admin({
      name,
      email,
      password:hashedPassword
    });


    await admin.save();


    res.status(201).json({
      message:"Admin created successfully"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});



// Admin Login
router.post("/login", async(req,res)=>{

  try{

    const {email,password}=req.body;


    const admin = await Admin.findOne({email});


    if(!admin){

      return res.status(404).json({
        message:"Admin not found"
      });

    }


    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );


    if(!isMatch){

      return res.status(401).json({
        message:"Invalid password"
      });

    }


    const token = jwt.sign(
      {
        id:admin._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    );


    res.json({

      token,

      admin:{
        id:admin._id,
        name:admin.name,
        email:admin.email
      }

    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

router.get("/dashboard",authMiddleware,(req,res)=>{

  res.json({
    message:"Welcome to Admin Dashboard",
    admin:req.admin
  });

});


module.exports = router;