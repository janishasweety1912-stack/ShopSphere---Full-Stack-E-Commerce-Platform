const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get all users (Admin)
router.get("/", authMiddleware, async(req,res)=>{

  try{

    const users = await User.find()
      .select("-password")
      .sort({
        createdAt:-1
      });


    res.json(users);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});


module.exports = router;