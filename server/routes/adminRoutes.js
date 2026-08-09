const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// CREATE ADMIN
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });

  } catch (error) {
    console.error("Admin registration error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// =====================================================
// ADMIN LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured on the server",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// =====================================================
// ADMIN DASHBOARD BASIC CHECK
// =====================================================

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    admin: req.admin,
  });
});


// =====================================================
// ADMIN DASHBOARD STATISTICS
// =====================================================

router.get("/stats", authMiddleware, async (req, res) => {
  try {

    // ---------------------------------------------
    // TOTAL PRODUCTS
    // ---------------------------------------------

    const totalProducts = await Product.countDocuments();


    // ---------------------------------------------
    // TOTAL CUSTOMERS
    // ---------------------------------------------

    const totalCustomers = await User.countDocuments({
      role: "user",
    });


    // ---------------------------------------------
    // TOTAL ORDERS
    // ---------------------------------------------

    const totalOrders = await Order.countDocuments();


    // ---------------------------------------------
    // PENDING ORDERS
    // ---------------------------------------------

    const pendingOrders = await Order.countDocuments({
      status: {
        $in: [
          "Order Placed",
          "Processing",
          "Pending",
        ],
      },
    });


    // ---------------------------------------------
    // TOTAL REVENUE
    // ---------------------------------------------

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;


    // ---------------------------------------------
    // CURRENT MONTH
    // ---------------------------------------------

    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );


    // ---------------------------------------------
    // NEW CUSTOMERS THIS MONTH
    // ---------------------------------------------

    const newCustomers = await User.countDocuments({
      role: "user",

      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });


    // ---------------------------------------------
    // MONTHLY SALES
    // ---------------------------------------------

    const monthlySalesResult = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
        },
      },

      {
        $group: {
          _id: null,

          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const monthlySales =
      monthlySalesResult.length > 0
        ? monthlySalesResult[0].total
        : 0;


    // ---------------------------------------------
    // LOW STOCK PRODUCTS
    // ---------------------------------------------

    const lowStockProducts = await Product.countDocuments({
      stock: {
        $lte: 5,
      },
    });


    // ---------------------------------------------
    // RECENT ORDERS
    // ---------------------------------------------

    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .populate(
        "user",
        "name email"
      );


    // ---------------------------------------------
    // RESPONSE
    // ---------------------------------------------

    res.json({

      stats: {

        totalProducts,

        totalOrders,

        totalCustomers,

        totalRevenue,

        pendingOrders,

        newCustomers,

        monthlySales,

        lowStockProducts,

      },

      recentOrders,

    });

  } catch (error) {

    console.error(
      "Dashboard stats error:",
      error
    );

    res.status(500).json({
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
});


module.exports = router;