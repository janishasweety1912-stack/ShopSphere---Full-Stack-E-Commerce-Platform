const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      revenueResult,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),

      User.countDocuments(),

      Product.countDocuments(),

      Order.countDocuments({
        status: {
          $in: ["Pending", "Order Placed"],
        },
      }),

      Order.countDocuments({
        status: "Shipped",
      }),

      Order.countDocuments({
        status: "Delivered",
      }),

      Order.countDocuments({
        status: "Cancelled",
      }),

      Order.aggregate([
        {
          $match: {
            status: {
              $ne: "Cancelled",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),

      Order.find()
        .populate("user", "name email")
        .sort({
          createdAt: -1,
        })
        .limit(5),
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.json({
      success: true,

      stats: {
        totalOrders,
        totalUsers,
        totalProducts,
        totalRevenue,

        pendingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
      },

      recentOrders,
    });
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;