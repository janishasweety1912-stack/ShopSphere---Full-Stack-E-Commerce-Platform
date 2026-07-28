const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false
  },

  products:[
    {
      product:{
        type:String,
        required:false
      },

      name:{
        type:String,
        required:true
      },

      image:{
        type:String
      },

      price:{
        type:Number,
        required:true
      },

      quantity:{
        type:Number,
        required:true
      }
    }
  ],

  totalAmount:{
    type:Number,
    required:true
  },

  shippingAddress:{
    name:String,
    phone:String,
    address:String,
    city:String,
    pincode:String
  },

  status:{
    type:String,
    default:"Order Placed"
  },

  paymentStatus:{
    type:String,
    default:"Pending"
  },

  paymentMethod:{
    type:String,
    default:"Cash on Delivery"
  }

},{
  timestamps:true
});


module.exports=mongoose.model("Order",orderSchema);