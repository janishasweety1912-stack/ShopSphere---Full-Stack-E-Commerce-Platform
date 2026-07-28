const express=require("express");
const Order=require("../models/Order");
const authMiddleware=require("../middleware/authMiddleware");

const router=express.Router();


// Create Order (No login required temporarily)
router.post("/",async(req,res)=>{

  try{

    const {
      products,
      totalAmount,
      shippingAddress,
      paymentMethod
    }=req.body;


    const order=new Order({

      products,

      totalAmount,

      shippingAddress,

      paymentMethod

    });


    await order.save();


    res.status(201).json({

      message:"Order placed successfully",

      order

    });


  }catch(error){
    console.log(error);
    res.status(500).json({

      message:error.message

    });

  }

});



// Get All Orders (Admin)
router.get("/",authMiddleware,async(req,res)=>{

  try{

    const orders=await Order.find()
    .populate("user","name email")
    .sort({
      createdAt:-1
    });


    res.json(orders);


  }catch(error){
    console.log("ORDER ERROR:",error);
    res.status(500).json({

      message:error.message

    });

  }

});



// Update Order Status (Admin)
router.put("/:id",authMiddleware,async(req,res)=>{

  try{

    const order=await Order.findById(req.params.id);


    if(!order){

      return res.status(404).json({

        message:"Order not found"

      });

    }


    order.status=req.body.status;


    await order.save();


    res.json({

      message:"Order status updated",

      order

    });


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});


module.exports=router;