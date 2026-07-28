const express=require("express");
const Product=require("../models/Product");
const authMiddleware=require("../middleware/authMiddleware");

const router=express.Router();


// Get All Products
router.get("/",async(req,res)=>{

  try{

    const products=await Product.find();

    res.json(products);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});



// Get Single Product
router.get("/:id",async(req,res)=>{

  try{

    const product=await Product.findById(req.params.id);

    if(!product){

      return res.status(404).json({
        message:"Product not found"
      });

    }

    res.json(product);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});



// Add Product
router.post("/",authMiddleware,async(req,res)=>{

  try{

    const product=new Product(req.body);

    await product.save();

    res.status(201).json({
      message:"Product added successfully",
      product
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});



// Update Product
router.put("/:id",authMiddleware,async(req,res)=>{

  try{

    const updatedProduct=await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true,
        runValidators:true
      }

    );


    if(!updatedProduct){

      return res.status(404).json({
        message:"Product not found"
      });

    }


    res.json({

      message:"Product updated successfully",

      product:updatedProduct

    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});




// Delete Product
router.delete("/:id",authMiddleware,async(req,res)=>{

  try{

    const product=await Product.findByIdAndDelete(req.params.id);

    if(!product){

      return res.status(404).json({
        message:"Product not found"
      });

    }

    res.json({
      message:"Product deleted successfully"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});


module.exports=router;